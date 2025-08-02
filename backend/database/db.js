const mongoose = require ('mongoose')
require('dotenv').config();

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
           
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}           

   module.exports = connectdb;