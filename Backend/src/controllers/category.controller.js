import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";


// ─── CREATE CATEGORY ──────────────────────────────────────────────────────────

const createCategory = asyncHandler(async (req, res) => {
    // get category details from request body
    // validate required fields
    // check if category already exists
    // create category entry in db
    // return response

    const { categoryID, name } = req.body

    if (!categoryID || !name) {
        throw new ApiError(400, "All fields are required")
    }

    const existingCategory = await Category.findOne({ $or: [{ categoryID }, { name }] })
    if (existingCategory) {
        throw new ApiError(400, "Category already exists with the provided categoryID or name")
    }

    const category = await Category.create({ categoryID, name })

    const createdCategory = await Category.findById(category._id)
    if (!createdCategory) {
        throw new ApiError(500, "Category creation failed")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdCategory, "Category created successfully")
        )
})


// ─── GET ALL CATEGORIES ───────────────────────────────────────────────────────

const getAllCategories = asyncHandler(async (req, res) => {
    // fetch all categories from db
    // return category list

    const categories = await Category.find()

    return res
        .status(200)
        .json(
            new ApiResponse(200, categories, "Categories fetched successfully")
        )
})


// ─── GET CATEGORY BY ID ───────────────────────────────────────────────────────

const getCategoryById = asyncHandler(async (req, res) => {
    // get id from params
    // find category in db
    // return category

    const { id } = req.params

    const category = await Category.findById(id)
    if (!category) {
        throw new ApiError(404, "Category not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, category, "Category fetched successfully")
        )
})


// ─── UPDATE CATEGORY ──────────────────────────────────────────────────────────

const updateCategory = asyncHandler(async (req, res) => {
    // get id from params
    // get fields to update from body
    // check if category exists
    // update category in db
    // return updated category

    const { id } = req.params
    const { name } = req.body

    const category = await Category.findById(id)
    if (!category) {
        throw new ApiError(404, "Category not found")
    }

    if (!name) {
        throw new ApiError(400, "Name is required to update category")
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { $set: { name } },
        { new: true }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedCategory, "Category updated successfully")
        )
})


// ─── DELETE CATEGORY ──────────────────────────────────────────────────────────

const deleteCategory = asyncHandler(async (req, res) => {
    // get id from params
    // check if category exists
    // delete category from db
    // return success response

    const { id } = req.params

    const category = await Category.findById(id)
    if (!category) {
        throw new ApiError(404, "Category not found")
    }

    await Category.findByIdAndDelete(id)

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Category deleted successfully")
        )
})


export {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}
