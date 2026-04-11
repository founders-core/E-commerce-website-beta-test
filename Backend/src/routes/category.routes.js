import { Router } from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

// public routes
router.route("/").get(getAllCategories)
router.route("/:id").get(getCategoryById)

// secured routes
router.route("/").post(verifyJWT, createCategory)
router.route("/:id").patch(verifyJWT, updateCategory)
router.route("/:id").delete(verifyJWT, deleteCategory)

export default router
