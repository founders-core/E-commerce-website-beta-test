import { Router } from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

// public routes
router.route("/").get(getAllProducts)
router.route("/:id").get(getProductById)

// secured routes — admin only (privilege check handled at controller/middleware level)
router.route("/").post(
    verifyJWT,
    upload.fields([
        { name: "productImage", maxCount: 1 }
    ]),
    createProduct
)

router.route("/:id").patch(
    verifyJWT,
    upload.fields([
        { name: "productImage", maxCount: 1 }
    ]),
    updateProduct
)

router.route("/:id").delete(verifyJWT, deleteProduct)

export default router
