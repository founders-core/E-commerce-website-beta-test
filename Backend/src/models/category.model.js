import mongoose from 'mongoose'
const categorySchema = new mongoose.Schema({
    
    categoryID :{
        type : String,
        req : true,
        unique : true
    },

    name :{
        type: String,
        req : true
    },

    
},{timestamps : true})

export const Category = mongoose.model('Category', categorySchema)