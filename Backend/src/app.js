import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { ApiError } from './utils/ApiError.js'
import userRouter     from "./routes/user.routes.js";
import productRouter  from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import cartRouter     from "./routes/cart.routes.js";
import orderRouter    from "./routes/order.routes.js";



const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']   
}))

app.use(express.json({limit: "200kb"}))
app.use(express.urlencoded({extended: true, limit: "200kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// routes declaration
app.use("/api/v1/users",      userRouter)
app.use("/api/v1/products",   productRouter)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/cart",       cartRouter)
app.use("/api/v1/orders",     orderRouter)


app.get("/health", (req,res) => {
    res.status(200).json({
        message: "Welcome to PavingPlus API"
    })
})

app.use((req, res, next) => {
    next(new ApiError(404, `Route not found: ${req.originalUrl}`))
})

app.use((err, req, res, next) => {
    const statusCode = err?.statusCode || 500
    const message = err?.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        message,
        data: null,
        error: err?.error || [],
    })
})

export { app }
