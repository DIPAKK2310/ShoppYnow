const user = require('../models/Auth-user');
const User = require('../models/Auth-user');
const bcrypt = require('bcryptjs');
const { validateRegistration, validateLogin } = require('../validators/authValidator');

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

        const validationErrors = validateRegistration(username, email, password);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            });
        }


        
        const cleanEmail = email.toLowerCase().trim();

        // Check if the user already exists
        const userExist = await User.findOne({ email: cleanEmail });
        
        if (userExist) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        // Hash the password before storing it
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const userCreated = await User.create({
            email:cleanEmail,
            username:username.trim(),
            password: hashPassword,
           
        }); 
   console.log("User stored in db", userCreated)
        res.status(200).json({
            message: "Registered successfully.",
            userCreated,
          
            // to generating the token 
            token:await userCreated.generateToken(),
            userId:await userCreated._id.toString(),
        });

    } catch (error) {
        console.error("Error in register controller:", error);  // Log the error for debugging
        res.status(500).json({
            message: "Server error, please try again later."
        });
    }
};

// Login route
const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const validationErrors = validateLogin(email, password);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            });
        }

        const cleanEmail = email.toLowerCase().trim();
        // Find user by email
        const user = await User.findOne({ email: cleanEmail });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // Compare the entered password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // generate jwt token for the user
        const token = await user.generateToken(); // Ensure that the `generateToken` method is defined on the user model
       
        // If password matches, proceed with login (e.g., send JWT token)
        res.status(200).json({
            message: "Login successful",
            token:token,
            userID:user._id.toString(),
            role:user.role || 'user',
        });

    } catch (error) {
        console.log(error);  // Log the error for debugging
        res.status(500).json({
            message: "Server error, please try again later."
        });
    }
};

module.exports = { home, register, login };
