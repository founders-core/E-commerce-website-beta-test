import mongoose from "mongoose"
import ExcelJS from "exceljs"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Order } from "../models/order.model.js"
import { Cart } from "../models/cart.model.js"
import { Product } from "../models/product.model.js"
import { Discount } from "../models/discount.model.js"

const placeOrder = async (req, res) => {
    try {
        const { address, discountCode } = req.body

        console.log("=== PLACE ORDER START ===")
        console.log("Address:", address)
        console.log("Discount Code:", discountCode)
        console.log("User:", req.user._id)

        if (!address) {
            throw new ApiError(400, "Delivery address is required")
        }

        const cart = await Cart.findOne({ userID: req.user._id }).populate("items.productID")
        if (!cart || cart.items.length === 0) {
            throw new ApiError(400, "Cart is empty, cannot place order")
        }

        console.log("Cart found:", cart._id)
        console.log("Cart items count:", cart.items.length)

        const orderItems = []
        let subTotal = 0

        for (const item of cart.items) {
            const product = item.productID
            if (!product) {
                throw new ApiError(404, "Product not found for one of the cart items")
            }
            if (product.stockQuantity < item.quantity) {
                throw new ApiError(400, `Insufficient stock for product: ${product.productName}`)
            }

            orderItems.push({
                productID: product._id,
                quantity: item.quantity,
                orderprice: item.price
            })
            subTotal += item.price * item.quantity
        }

        console.log("Subtotal calculated:", subTotal)

        let amountAfterDiscount = subTotal
        let discountRef

        if (discountCode) {
            console.log("Applying discount code:", discountCode)
            const discount = await Discount.findOne({ discountCode })
            if (!discount) {
                throw new ApiError(404, "Invalid discount code")
            }

            const now = new Date()
            if (now < discount.validFrom || now > discount.validTo) {
                throw new ApiError(400, "Discount code is expired or not yet valid")
            }

            if (discount.discountAmount) {
                amountAfterDiscount = subTotal - discount.discountAmount
                console.log(`Applied fixed discount of ${discount.discountAmount}`)
            } else {
                amountAfterDiscount = subTotal - (subTotal * discount.discountPercentage) / 100
                console.log(`Applied ${discount.discountPercentage}% discount`)
            }

            amountAfterDiscount = Math.max(0, amountAfterDiscount)
            discountRef = discount._id
            console.log("Amount after discount:", amountAfterDiscount)
        }

        const finalTotal = Math.round(amountAfterDiscount * 100) / 100

        console.log("=== FINAL CALCULATIONS ===")
        console.log("Subtotal:", subTotal)
        console.log("Amount after discount:", amountAfterDiscount)
        console.log("Total (order amount):", finalTotal)
        console.log("=========================")

        const orderID = Date.now()
        console.log("Generated Order ID:", orderID)

        const order = await Order.create({
            orderID,
            orderStatus: "confirmed",
            customer: req.user._id,
            address,
            orderItems,
            subTotal,
            discount: discountRef,
            totalAmount: finalTotal,
            createdBy: req.user._id
        })

        console.log("Order created with ID:", order._id)
        console.log("Order totalAmount saved:", order.totalAmount)

        const createdOrder = await Order.findById(order._id)
            .populate("customer", "userName email phoneNo")
            .populate("orderItems.productID", "productName price productImage")
            .populate("discount", "discountCode discountPercentage discountAmount")

        if (!createdOrder) {
            throw new ApiError(500, "Order creation failed")
        }

        console.log("Final order totalAmount:", createdOrder.totalAmount)

        for (const item of cart.items) {
            await Product.findByIdAndUpdate(
                item.productID._id,
                { $inc: { stockQuantity: -item.quantity } }
            )
        }

        await Cart.findByIdAndUpdate(cart._id, {
            $set: { items: [], discount: undefined, totalPrice: 0 }
        })

        console.log("=== ORDER PLACED SUCCESSFULLY ===")

        return res
            .status(201)
            .json(new ApiResponse(201, createdOrder, "Order placed successfully"))
    } catch (error) {
        console.error("Error in placeOrder:", error)
        return res.status(500).json({ error: error.message })
    }
}

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
        .populate("customer", "userName email phoneNo")
        .populate("orderItems.productID", "productName price")
        .populate("discount", "discountCode discountPercentage discountAmount")
        .sort({ createdAt: -1 })

    return res
        .status(200)
        .json(new ApiResponse(200, orders, "All orders fetched successfully"))
})

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ customer: req.user._id })
        .populate("orderItems.productID", "productName price productImage")
        .populate("discount", "discountCode discountPercentage discountAmount")
        .sort({ createdAt: -1 })

    return res
        .status(200)
        .json(new ApiResponse(200, orders, "Your orders fetched successfully"))
})

const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid order id")
    }

    const order = await Order.findById(id)
        .populate("customer", "userName email phoneNo")
        .populate("orderItems.productID", "productName price productImage")
        .populate("discount", "discountCode discountPercentage discountAmount")

    if (!order) {
        throw new ApiError(404, "Order not found")
    }

    if (
        req.user.privilege !== "admin" &&
        order.customer._id.toString() !== req.user._id.toString()
    ) {
        throw new ApiError(403, "You are not authorized to view this order")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, order, "Order fetched successfully"))
})

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { orderStatus } = req.body

    const allowedStatuses = ["pending", "confirmed", "cancelled"]
    if (!orderStatus || !allowedStatuses.includes(orderStatus)) {
        throw new ApiError(400, `orderStatus must be one of: ${allowedStatuses.join(", ")}`)
    }

    const order = await Order.findById(id)
    if (!order) {
        throw new ApiError(404, "Order not found")
    }

    if (order.orderStatus === "cancelled") {
        throw new ApiError(400, "Cannot update status of a cancelled order")
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { $set: { orderStatus } },
        { new: true }
    )
        .populate("customer", "userName email phoneNo")
        .populate("orderItems.productID", "productName price")
        .populate("discount", "discountCode discountPercentage discountAmount")

    return res
        .status(200)
        .json(new ApiResponse(200, updatedOrder, "Order status updated successfully"))
})

const cancelOrder = asyncHandler(async (req, res) => {
    const { id } = req.params

    const order = await Order.findById(id).populate("orderItems.productID")
    if (!order) {
        throw new ApiError(404, "Order not found")
    }

    if (order.customer.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to cancel this order")
    }

    if (order.orderStatus !== "pending" && order.orderStatus !== "confirmed") {
        throw new ApiError(400, "Only pending or confirmed orders can be cancelled")
    }

    for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(
            item.productID._id,
            { $inc: { stockQuantity: item.quantity } }
        )
    }

    const cancelledOrder = await Order.findByIdAndUpdate(
        id,
        { $set: { orderStatus: "cancelled" } },
        { new: true }
    )
        .populate("customer", "userName email phoneNo")
        .populate("orderItems.productID", "productName price")

    return res
        .status(200)
        .json(new ApiResponse(200, cancelledOrder, "Order cancelled successfully"))
})

const exportOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
        .populate("customer", "userName email phoneNo")
        .populate("orderItems.productID", "productName")
        .sort({ createdAt: -1 })

    if (!orders.length) {
        throw new ApiError(404, "No orders found")
    }

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("Orders")

    worksheet.columns = [
        { header: "Order ID", key: "orderID", width: 15 },
        { header: "Order Status", key: "orderStatus", width: 15 },
        { header: "Customer Name", key: "customerName", width: 25 },
        { header: "Customer Email", key: "customerEmail", width: 30 },
        { header: "Customer Phone", key: "customerPhone", width: 15 },
        { header: "Address", key: "address", width: 40 },
        { header: "Products", key: "products", width: 50 },
        { header: "Sub Total", key: "subTotal", width: 12 },
        { header: "Total Amount", key: "totalAmount", width: 12 },
        { header: "Order Date", key: "orderDate", width: 20 },
        { header: "Created At", key: "createdAt", width: 20 }
    ]

    worksheet.views = [{ state: "frozen", ySplit: 1 }]

    const headerRow = worksheet.getRow(1)
    headerRow.font = { bold: true }
    headerRow.alignment = { vertical: "middle", horizontal: "center" }

    orders.forEach(order => {
        const productsList = order.orderItems
            .map(item => {
                const productName = item.productID?.productName || "Unknown Product"
                return `${productName} (Qty: ${item.quantity}, Price: Rs.${item.orderprice})`
            })
            .join("; ")

        worksheet.addRow({
            orderID: order.orderID,
            orderStatus: order.orderStatus,
            customerName: order.customer?.userName || "N/A",
            customerEmail: order.customer?.email || "N/A",
            customerPhone: order.customer?.phoneNo || "N/A",
            address: order.address,
            products: productsList,
            subTotal: order.subTotal,
            totalAmount: order.totalAmount,
            orderDate: new Date(order.orderDate || order.createdAt).toLocaleString(),
            createdAt: new Date(order.createdAt).toLocaleString()
        })
    })

    worksheet.columns.forEach(column => {
        let maxLength = 0
        column.eachCell({ includeEmpty: true }, cell => {
            const columnLength = cell.value ? cell.value.toString().length : 10
            if (columnLength > maxLength) {
                maxLength = columnLength
            }
        })
        column.width = Math.min(maxLength + 2, 50)
    })

    res.setHeader("Cache-Control", "no-store")
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=orders_${new Date().toISOString().split("T")[0]}.xlsx`
    )

    await workbook.xlsx.write(res)
    return res.end()
})

export {
    placeOrder,
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
    exportOrders
}
