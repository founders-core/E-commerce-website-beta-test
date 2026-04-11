import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    quantity: {
        type: Number,
        default: 1,
        min: 1
    },

    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const cartSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true  // One cart per user
        },

        items: {
            type: [cartItemSchema],
            default: []
        },

        discount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Discount"
        },

        totalPrice: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
)

// Add index for better query performance
cartSchema.index({ userID: 1 });

const Cart = mongoose.model("Cart", cartSchema);

export { Cart }