 const mongoose = require('mongoose')
//  requiring the mongoose to connect with db
const jwt =require('jsonwebtoken')
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY

 const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address'],
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        
    },
   

 }, {timestamps: true});



//  Creating the schema for data


userSchema.methods.generateToken = async function (){
    try {
      
      return jwt.sign({
        userId:this._id.toString(),
        email:this.email,
        isUser:true,
      },
    secretKey,{expiresIn:'10h'}
    )
    } catch (error) {
      console.error("JWT token generation error",error)
      throw new Error("Failed to generate JWT token")
    }
  }


 const User = mongoose.model("User",userSchema)

 module.exports=User