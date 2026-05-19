require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs')

const secretKey = process.env.JWT_SECRET_KEY;
// middleware to authenticate admin

const authenticateAdmin=(req, res, next)=>{

  try {
    
    const token=req.headers.authorization?.split(' ')[1];

    if (!token) {
       return res.status(401).json({ message: 'Token not found' });
    }
    jwt.verify(token, secretKey,(err,decoded)=>{
       if (err) {
           return res.status(401).json({ message: 'Invalid token' });  
       }
   
         // ✅ Check if role is admin
       if (decoded.role !== 'admin') {
         return res.status(403).json({ message: 'Access denied. Admins only.' });
       }
       req.admin=decoded;
       next();
    });
      } catch (error) {
        console.error("Admin auth error",error)
        res.status(401).json({message: 'Invalid or Expired token'})
      }

}

module.exports = authenticateAdmin;
