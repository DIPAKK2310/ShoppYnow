const user = require('../models/Auth-user');
const User = require('../models/Auth-user');
const bcrypt = require('bcryptjs');

// Home route (no changes)
const home = async (req, res) => {
    try {
        res.send("This is Home page of Project");
    } catch (error) {
        console.log(error);
    }
};

// Register route
const register = async (req, res) => {
    console.log(req.body);  // Log incoming data for debugging

    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const userExist = await User.findOne({ email: email });
        
        if (userExist) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        // Hash the password before storing it
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const userCreated = await User.create({
            email,
            username,
            password: hashPassword,
           
        }); 

        res.status(200).json({
            message: "Registered successfully.",
            userCreated,
            // to generating the token 
            token:await userCreated.generateToken(),
            userId:await userCreated._id.toString(),
        });

    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({
            message: "Server error, please try again later."
        });
    }
};

// Login route
const login = async (req, res) => {

    try {
        const { email, password } = req.body;



        // Find user by email
        const isFound = await User.findOne({ email: email });

        if (!isFound) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // Compare the entered password with the stored hash
        const isMatch = await bcrypt.compare(password, isFound.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // generate jwt token for the user
        const token = await isFound.generateToken(); // Ensure that the `generateToken` method is defined on the user model
       
        // If password matches, proceed with login (e.g., send JWT token)
        res.status(200).json({
            message: "Login successful",
            token:token,
            userID:isFound._id.toString(),
            role:user.role,
        });

    } catch (error) {
        console.log(error);  // Log the error for debugging
        res.status(500).json({
            message: "Server error, please try again later."
        });
    }
};

module.exports = { home, register, login };
