import mongoose,{Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema({
    
    street:{
        type : String,  
        required : true
    },

    city :{
        type : String,
        required : true
    },

    state :{
        type : String,
        required : true
    },
    
    pincode :{
        type : Number,
        required : true
    }
},{timestamps : true})

const userSchema = new mongoose.Schema({
    role :{
        type : String,
        enum : ['Real Estate Developer','Contractor','Government Body','Architect','ESG Consultant','Individual Buyer'],
        default : 'Individual Buyer'
    },

    privelege:{
        type : String,
        enum : ['user','admin'],
        default : 'user'
    },

    userName :{
        type : String,
        required : true,
    },

    email :{
        type : String,
        required : true,

    },

    password :{
        type: String,
        required : [true, "Password is required"]
    },

    phoneNo : {
        type : Number,
        required : true,
    },

    organisation : {
        type : String,
    },

    address :{
        type : [addressSchema],
        required : true,
    },
    accessToken : {
        type : String,
    },


},{timestamps : true})

// Generate Access Token
userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "7d"
        }
    )

}



userSchema.pre("save", async function(next){
    if(!this.isModified("password"))
        return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()                      

})

userSchema.methods.isPasswordCorrect = async  function(password){
    return await bcrypt.compare(password, this.password)
};



export const Address = mongoose.model('Address', addressSchema)
export const User = mongoose.model('User', userSchema)