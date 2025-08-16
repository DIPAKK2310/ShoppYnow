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
            try{
            res.status(200).json({
                userData: req.user,
                message: "data send succesfully"
            })
        }catch(error){
            res.status(500).json({
                message: "Error in getting user data",
                error: error.message
            })
        }
        })
      

module.exports=router