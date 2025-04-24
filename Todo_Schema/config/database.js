const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("✅ Database connection successful");
  } 
  catch (err) {
    console.error("❌ Error in database connection:", err.message);
    process.exit(1); // Optional: Exit the app if DB connection fails
  }
};

module.exports = dbConnect;
