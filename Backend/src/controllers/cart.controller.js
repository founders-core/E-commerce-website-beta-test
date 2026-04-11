import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { Discount } from "../models/discount.model.js";


// ─── HELPER: recalculate cart total ──────────────────────────────────────────

const recalculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}


// ─── GET CART ─────────────────────────────────────────────────────────────────

const getCart = asyncHandler(async (req, res) => {
    // find cart belonging to logged-in user
    // populate product details inside items
    // return cart

    let cart = await Cart.findOne({ userID: req.user._id })
        .populate("items.productID", "productName price productImage")
        .populate("discount", "discountCode discountPercentage discountAmount")

    if (!cart) {
        // return an empty cart shape instead of 404 for better UX
        return res
            .status(200)
            .json(
                new ApiResponse(200, { items: [], totalPrice: 0 }, "Cart is empty")
            )
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, cart, "Cart fetched successfully")
        )
})


// ─── ADD ITEM TO CART ─────────────────────────────────────────────────────────

const addItemToCart = asyncHandler(async (req, res) => {
    // get productID and quantity from body
    // validate product exists and has sufficient stock
    // if cart doesn't exist, create one
    // if product already in cart, increment quantity
    // else push new cart item
    // recalculate total and save
    // return updated cart

    const { productID, quantity = 1 } = req.body

    if (!productID) {
        throw new ApiError(400, "productID is required")
    }

    if (quantity < 1) {
        throw new ApiError(400, "Quantity must be at least 1")
    }

    const product = await Product.findById(productID)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    if (product.stockQuantity < quantity) {
        throw new ApiError(400, "Insufficient stock for the requested quantity")
    }

    let cart = await Cart.findOne({ userID: req.user._id })

    if (!cart) {
        cart = await Cart.create({
            userID: req.user._id,
            items: [{ productID, quantity, price: product.price }],
            totalPrice: product.price * quantity
        })
    } else {
        const existingItemIndex = cart.items.findIndex(
            (item) => item.productID.toString() === productID
        )

        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += quantity
        } else {
            cart.items.push({ productID, quantity, price: product.price })
        }

        cart.totalPrice = recalculateTotal(cart.items)
        await cart.save()
    }

    const updatedCart = await Cart.findById(cart._id)
        .populate("items.productID", "productName price productImage")
        .populate("discount", "discountCode discountPercentage discountAmount")

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedCart, "Item added to cart successfully")
        )
})


// ─── UPDATE ITEM QUANTITY ─────────────────────────────────────────────────────

const updateCartItem = asyncHandler(async (req, res) => {
    // get productID and new quantity from body
    // find the user's cart
    // find the item inside cart
    // if quantity is 0 remove it, else update quantity
    // recalculate total and save
    // return updated cart

    const { productID, quantity } = req.body

    if (!productID || quantity === undefined) {
        throw new ApiError(400, "productID and quantity are required")
    }

    if (quantity < 0) {
        throw new ApiError(400, "Quantity cannot be negative")
    }

    const cart = await Cart.findOne({ userID: req.user._id })
    if (!cart) {
        throw new ApiError(404, "Cart not found")
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.productID.toString() === productID
    )
    if (itemIndex === -1) {
        throw new ApiError(404, "Item not found in cart")
    }

    if (quantity === 0) {
        cart.items.splice(itemIndex, 1)
    } else {
        const product = await Product.findById(productID)
        if (!product) {
            throw new ApiError(404, "Product not found")
        }
        if (product.stockQuantity < quantity) {
            throw new ApiError(400, "Insufficient stock for the requested quantity")
        }
        cart.items[itemIndex].quantity = quantity
    }

    cart.totalPrice = recalculateTotal(cart.items)
    await cart.save()

    const updatedCart = await Cart.findById(cart._id)
        .populate("items.productID", "productName price productImage")
        .populate("discount", "discountCode discountPercentage discountAmount")

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedCart, "Cart updated successfully")
        )
})


// ─── REMOVE ITEM FROM CART ────────────────────────────────────────────────────

const removeItemFromCart = asyncHandler(async (req, res) => {
    // get productID from params
    // find the user's cart
    // remove item from items array
    // recalculate total and save
    // return updated cart

    const { productID } = req.params

    const cart = await Cart.findOne({ userID: req.user._id })
    if (!cart) {
        throw new ApiError(404, "Cart not found")
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.productID.toString() === productID
    )
    if (itemIndex === -1) {
        throw new ApiError(404, "Item not found in cart")
    }

    cart.items.splice(itemIndex, 1)
    cart.totalPrice = recalculateTotal(cart.items)
    await cart.save()

    const updatedCart = await Cart.findById(cart._id)
        .populate("items.productID", "productName price productImage")
        .populate("discount", "discountCode discountPercentage discountAmount")

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedCart, "Item removed from cart successfully")
        )
})


// ─── APPLY DISCOUNT ───────────────────────────────────────────────────────────

const applyDiscount = asyncHandler(async (req, res) => {
    // get discountCode from body
    // validate discount exists and is currently valid (date range)
    // apply discount to cart and recalculate total
    // return updated cart

    const { discountCode } = req.body

    if (!discountCode) {
        throw new ApiError(400, "Discount code is required")
    }

    const discount = await Discount.findOne({ discountCode })
    if (!discount) {
        throw new ApiError(404, "Invalid discount code")
    }

    const now = new Date()
    if (now < discount.validFrom || now > discount.validTo) {
        throw new ApiError(400, "Discount code is expired or not yet valid")
    }

    const cart = await Cart.findOne({ userID: req.user._id })
    if (!cart) {
        throw new ApiError(404, "Cart not found")
    }

    if (cart.items.length === 0) {
        throw new ApiError(400, "Cannot apply discount to an empty cart")
    }

    const baseTotal = recalculateTotal(cart.items)
    const discountedAmount = discount.discountAmount
        ? baseTotal - discount.discountAmount
        : baseTotal - (baseTotal * discount.discountPercentage) / 100

    cart.discount = discount._id
    cart.totalPrice = Math.max(0, discountedAmount)
    await cart.save()

    const updatedCart = await Cart.findById(cart._id)
        .populate("items.productID", "productName price productImage")
        .populate("discount", "discountCode discountPercentage discountAmount")

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedCart, "Discount applied successfully")
        )
})


// ─── CLEAR CART ───────────────────────────────────────────────────────────────

const clearCart = asyncHandler(async (req, res) => {
    // find user's cart
    // clear all items, reset total and discount
    // return empty cart

    const cart = await Cart.findOne({ userID: req.user._id })
    if (!cart) {
        throw new ApiError(404, "Cart not found")
    }

    cart.items     = []
    cart.discount  = undefined
    cart.totalPrice = 0
    await cart.save()

    return res
        .status(200)
        .json(
            new ApiResponse(200, cart, "Cart cleared successfully")
        )
})


export {
    getCart,
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
    applyDiscount,
    clearCart
}
