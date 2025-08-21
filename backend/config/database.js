// config/database.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace process.env.MONGODB_URI with your connection string from .env
    await mongoose.connect(process.env.MONGODB_URI, {
  serverApi: { version: '1', strict: true, deprecationErrors: true }
});

    console.log(`MongoDB Connected: ` + mongoose.connection.host);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;


// how to whitelist an IP address in MongoDB Atlas
// 1. Log in to your MongoDB Atlas account.
// 2. Navigate to the "Network Access" tab in your project.
// 3. Click on "Add IP Address".
// 4. Enter the IP address you want to whitelist. You can also use "
