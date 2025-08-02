const express = require("express")
const { home, register, login } = require("../controller/Auth-controller")
const middleware=require('../middleware/Auth-middleware')
const User =require('../models/Auth-user')
const router= express.Router()



router.route("/").get(home)
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/getuserData")
    .get(middleware,
        async (req, res) => {
            res.status(200).json({
                userData: req.user,
                message: "data send "
            })
        })

        router.get("/users",async(req,res)=>{
   
          const UsersData = await User.find()
          res.status(200).json({
              message:"data send succesfully ",
              UsersData
      
              
          })
      })       

module.exports=router