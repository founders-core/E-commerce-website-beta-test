import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"



export  const verifyJWT = asyncHandler(async (req,res,next) => {
    try {
        const token = req.cookies?.accessToken ||
        req.headers?.authorization?.replace("Bearer ", "");
    
        if(!token){
            throw new ApiError(401,"Unauthorized access, token is missing")
        }
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id).select("-password ")
        if(!user)
        {
            throw new ApiError(401,"Unauthorized access, invalid token")
        }
    
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Unauthorized access, invalid token")
        
    }
})

