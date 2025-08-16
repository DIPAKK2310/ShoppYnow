const mongoose =  require('mongoose')

const jwt = require ('jsonwebtoken')

require('dotenv').config();


const secretKey = process.env.JWT_SECRET_KEY;   

const adminSchema = mongoose.Schema({
    username:{
      type: String,
      required: true,    
      trim: true
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
        type: String,
        required: true,
        minlength: 6,
            }
    },{timestamps:true});



// MEthods to generates jwt token for admin

adminSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            adminId : this._id.toString(),
            email: this.email,
            isAdmin: true,
        },
        secretKey,
        {expiresIn:'10hr'}
    );
    } catch (error) {
        console.error("JWT token generation erro : ",error)
        throw new Error("Failed to generate JWT token")
    }
}


const Admin = mongoose.model("Admin",adminSchema);
module.exports = Admin;



