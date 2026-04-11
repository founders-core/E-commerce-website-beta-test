import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";


// ─── CREATE PRODUCT ───────────────────────────────────────────────────────────

const createProduct = asyncHandler(async (req, res) => {
    // get product details from request body
    // validate required fields
    // check if category exists
    // check if product with same name or productId already exists
    // create product entry in db
    // return response

    const { productName, description, price, stockQuantity, productRating, category } = req.body
    const productID = req.body.productID ?? req.body.productId

    if (!productID || !productName || !description || !price || !stockQuantity || !productRating || !category) {
        throw new ApiError(400, "All fields are required")
    }

    const existingCategory = await Category.findById(category)
    if (!existingCategory) {
        throw new ApiError(404, "Category not found")
    }

    const existingProduct = await Product.findOne({ $or: [{ productID }, { productName }] })
    if (existingProduct) {
        throw new ApiError(400, "Product already exists with the provided productID or name")
    }

    const productImageLocalPath = req.files?.productImage?.[0]?.path
    if (!productImageLocalPath) {
        throw new ApiError(400, "Product image is required")
    }

    const product = await Product.create({
        productID,
        productName,
        description,
        price,
        stockQuantity,
        productImage: productImageLocalPath,
        productRating,
        category,
        createdBy: req.user._id
    })

    const createdProduct = await Product.findById(product._id).populate("category", "name")
    if (!createdProduct) {
        throw new ApiError(500, "Product creation failed")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdProduct, "Product created successfully")
        )
})


// ─── GET ALL PRODUCTS ─────────────────────────────────────────────────────────

const getAllProducts = asyncHandler(async (req, res) => {
    // optional query params: category, minPrice, maxPrice, search
    // fetch products with filters applied
    // return product list

    const { category, minPrice, maxPrice, search } = req.query

    const filter = {}

    if (category) {
        filter.category = category
    }

    if (minPrice || maxPrice) {
        filter.price = {}
        if (minPrice) filter.price.$gte = Number(minPrice)
        if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    if (search) {
        filter.productName = { $regex: search, $options: "i" }
    }

    const products = await Product.find(filter).populate("category", "name")

    return res
        .status(200)
        .json(
            new ApiResponse(200, products, "Products fetched successfully")
        )
})


// ─── GET PRODUCT BY ID ────────────────────────────────────────────────────────

const getProductById = asyncHandler(async (req, res) => {
    // get productId from params
    // find product in db
    // return product

    const { id } = req.params

    const product = await Product.findById(id).populate("category", "name")
    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, product, "Product fetched successfully")
        )
})


// ─── UPDATE PRODUCT ───────────────────────────────────────────────────────────

const updateProduct = asyncHandler(async (req, res) => {
    // get productId from params
    // get fields to update from body
    // check if product exists
    // update product in db
    // return updated product

    const { id } = req.params
    const { productName, description, price, stockQuantity, productRating, category } = req.body

    const product = await Product.findById(id)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    if (category) {
        const existingCategory = await Category.findById(category)
        if (!existingCategory) {
            throw new ApiError(404, "Category not found")
        }
    }

    const updatedFields = {}
    if (productName)    updatedFields.productName    = productName
    if (description)    updatedFields.description    = description
    if (price)          updatedFields.price          = price
    if (stockQuantity)  updatedFields.stockQuantity  = stockQuantity
    if (productRating)  updatedFields.productRating  = productRating
    if (category)       updatedFields.category       = category

    if (req.files?.productImage?.[0]?.path) {
        updatedFields.productImage = req.files.productImage[0].path
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: updatedFields },
        { new: true }
    ).populate("category", "name")

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedProduct, "Product updated successfully")
        )
})


// ─── DELETE PRODUCT ───────────────────────────────────────────────────────────

const deleteProduct = asyncHandler(async (req, res) => {
    // get productId from params
    // check if product exists
    // delete product from db
    // return success response

    const { id } = req.params

    const product = await Product.findById(id)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    await Product.findByIdAndDelete(id)

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Product deleted successfully")
        )
})


export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
