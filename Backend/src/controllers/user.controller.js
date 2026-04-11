import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ── Token helper ──────────────────────────────────────────────────────────────

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    user.accessToken = accessToken;
    await user.save({ validateBeforeSave: false });
    return accessToken;
  } catch (error) {
    throw new ApiError(500, "Failed to generate access token");
  }
};

// ── Register ──────────────────────────────────────────────────────────────────

const registerUser = asyncHandler(async (req, res) => {
  const { userName, role, email, phoneNo, password, organisation, address } = req.body;

  // Make organisation optional
  if (!userName || !role || !email || !phoneNo || !password || !address) {
    throw new ApiError(400, "All required fields must be provided");
  }

  const existedUser = await User.findOne({ $or: [{ email }, { userName }] });
  if (existedUser) {
    throw new ApiError(400, "User already exists with the provided email or username");
  }

  // Create user with all fields including address
  const user = await User.create({ 
    userName, 
    email, 
    phoneNo, 
    password, 
    organisation: organisation || '', // Handle optional organisation
    address: [address], // Wrap address in array as per schema
    role: role || 'Individual Buyer'
  });

  const createdUser = await User.findById(user._id).select("-password -accessToken");
  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, { user: createdUser }, "User registered successfully"));
});
// ── Login ─────────────────────────────────────────────────────────────────────

const loginUser = asyncHandler(async (req, res) => {
  const { email, userName, password } = req.body;

  if (!email && !userName) {
    throw new ApiError(400, "Please provide email or username to login");
  }

  const user = await User.findOne({ $or: [{ email }, { userName }] });
  if (!user) {
    throw new ApiError(404, "User not found with the provided email or username");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }

  const accessToken = await generateAccessToken(user._id);
  const loggedInUser = await User.findById(user._id).select("-password -accessToken");

  const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, { 
        user: loggedInUser, 
        accessToken 
      }, "User logged in successfully")
    );
});

// ── Logout ────────────────────────────────────────────────────────────────────

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { accessToken: undefined } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// ── Change password ───────────────────────────────────────────────────────────
// FIX: was incorrectly nested inside logoutUser, making it completely unreachable.

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

// ── Exports ───────────────────────────────────────────────────────────────────

export { registerUser, loginUser, logoutUser, changeCurrentPassword };