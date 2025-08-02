 const mongoose = require('mongoose')
//  requiring the mongoose to connect with db
const jwt =require('jsonwebtoken')
require('dotenv').config();

const secretKey = process.env.JWT_SECRET

 const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    },

 }, {timestamps: true});



//  Creating the schema for data


userSchema.methods.generateToken = async function (){
    try {
      
      return jwt.sign({
        userId:this._id.toString(),
        email:this.email,
        isAdmin:this.role=='admin',
      },
   process.env.JWT_SECRET_KEY,{expiresIn:'10h'}
    )
    } catch (error) {
      
    }
  }


 const user = mongoose.model("user",userSchema)

 module.exports=user