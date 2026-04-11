import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productID :{
        type : String,
        required : true,
        unique : true
    },

    productName :{
        type : String,
        req : true,
        unique : true
    },

    description :{
        type : String,
        req : true
    },

    price :{
        type : Number,
        req : true
    },

    stockQuantity :{
        type : Number,
        req : true
    },

    productImage: {
        type : String,
        req : true
    },

    productRating :{
        type : Number,
        req : true
    },


    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
    },

    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        req : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }


},{timestamps : true})

const Product = mongoose.model('Product',productSchema)

export { Product }