import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([]),  // extend with file fields when needed
  registerUser
);

router.route("/login").post(loginUser);

// Secured routes — require a valid JWT
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);

export default router;