const mongoose = require("mongoose");

async function connectToDb() {
  try {
    // This will now cleanly read from the globally loaded process.env
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
}

module.exports = connectToDb;