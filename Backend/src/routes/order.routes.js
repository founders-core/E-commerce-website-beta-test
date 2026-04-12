import { Router } from "express";
import {
    placeOrder,
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
    exportOrders
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

// all order routes require authentication
router.use(verifyJWT)

router.route("/").post(placeOrder)                    // place a new order
router.route("/my-orders").get(getMyOrders)           // logged-in user's orders
router.route("/export").get(exportOrders)             // ✅ MUST be before /:id
router.route("/all").get(getAllOrders)                // admin: all orders
router.route("/:id").get(getOrderById)                // single order detail
router.route("/:id/status").patch(updateOrderStatus)  // admin: update status
router.route("/:id/cancel").patch(cancelOrder)        // user: cancel own order

export default router