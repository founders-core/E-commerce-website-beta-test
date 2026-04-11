import mongoose from 'mongoose'

const discountSchema = new mongoose.Schema({
    discountID :{
        type : String,
        req : true,
        unique : true
    },

    discountCode:{
        type : String,
        req : true,
        unique : true
    },

    discountPercentage :{
        type : Number,
        req : true
    },

    discountAmount :{
        type : Number,
        req : true
    },

    validFrom :{
        type : Date,
        req : true
    },

    validTo :{
        type : Date,
        req : true
    }
    
},{timestamps :true})

export const Discount = mongoose.model('Discount',discountSchema)