const express = require('express')
// require ('') to utilising the module of node

// requiring cors for the connection front-backend
const cors = require("cors")

// database connection
const connectdb = require('./database/db')

// Load .env variable 
require('dotenv').config();

// Import Routes
const authRouter = require("./routes/Auth-route")
const adminRouter= require("./routes/Admin-route")
const productRouter = require('./routes/Product-route')




const app = express()
// Storing express in app variable
const corsSystem = {
    origin: "http://localhost:5173",  //Front-end url
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}

app.use(cors(corsSystem))


app.use(express.json())

// Routes
    app.use("/api/auth",authRouter)
    app.use("/api/admin",adminRouter)
    app.use("/api/product",productRouter)

    app.get('/',(req,res)=>{
        res.status(200).send("Backend is running🚀")
    })
 


const PORT = process.env.PORT



connectdb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`This server running on http://localhost:${PORT}`)
    });
}).catch((error)=>{
    console.error('Failed to connect to database:',error)
});


