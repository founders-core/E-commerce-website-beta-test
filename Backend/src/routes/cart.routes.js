import { Router } from "express";
import {
    getCart,
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
    applyDiscount,
    clearCart
} from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

// all cart routes require authentication
router.use(verifyJWT)

router.route("/").get(getCart)
router.route("/add").post(addItemToCart)
router.route("/update").patch(updateCartItem)
router.route("/remove/:productID").delete(removeItemFromCart)
router.route("/apply-discount").post(applyDiscount)
router.route("/clear").delete(clearCart)

export default router
