const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() =>{
    try {
        
        const MONGODB_URL = process.env.MONGODB_URL;
        console.log("URL:-",MONGODB_URL)
        await mongoose.connect(MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        console.log("MongoDB is connected");
    } catch (error) {
        console.log("Error in connecting to DB.")
        console.log("Error:-",error);
    }
    
}

module.exports = connectDB;