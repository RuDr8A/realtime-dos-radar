
const mongoose = require("mongoose");

async function connectToDB() {
  try {
    
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is missing.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); 
  }
}

module.exports = connectToDB;
