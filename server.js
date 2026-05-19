// 1. Load environment variables first thing!
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// 2. Import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDb");

// 3. Create app and connect to DB
const app = express();
connectToDb();

// 4. Routing
app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

// 5. Start server (Fallback to port 5000 if process.env.PORT is undefined)
// Note: change "port" to uppercase "PORT" as it is standard in .env files
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});