import mongoose from 'mongoose'



const orderitemsSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true  // ✅ Fixed
    },
    quantity: {
        type: Number,
        required: true  // ✅ Fixed
    },
    orderprice: {
        type: Number,
        required: true  // ✅ Fixed
    }
}, { timestamps: true })

const OrderItems = mongoose.model('OrderItems',orderitemsSchema)

const orderSchema = new mongoose.Schema({
    orderID: {
        type: Number,
        required: true,  // ✅ Fixed
        unique: true
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],  // Also fixed 'Cancelled' → 'cancelled'
        default: 'confirmed',
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  // ✅ Fixed
    },
    address: {
        type: String,
        required: true  // ✅ Fixed
    },
    orderItems: {
        type: [orderitemsSchema],
        required: true  // ✅ Fixed
    },
    subTotal: {
        type: Number,
        required: true  // ✅ Fixed
    },
    discount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount',
    },
    totalAmount: {  
        type: Number,
        required: true  // ✅ Fixed - THIS WAS THE MAIN ISSUE
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  // ✅ Fixed
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

// New orders are always confirmed at placement (avoids stale code paths or client body setting "pending")
orderSchema.pre('save', function (next) {
    if (this.isNew) {
        this.orderStatus = 'confirmed'
    }
    next()
})

const Order = mongoose.model('Order',orderSchema)

export { OrderItems, Order }