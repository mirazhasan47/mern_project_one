// 1. Load environment variables first thing!
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// 2. Import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDb");
const Note = require("./models/note");

// 3. Create app and connect to DB
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies 

connectToDb();

// 4. Routing
app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.get("/notes", async (req, res) => {
  // Find the notes
  const notes = await Note.find();

  // Respond with them
  res.json({ notes: notes });
});

app.post("/notes", async (req, res) => {
  const { title, body } = req.body;

  const note = await Note.create({
    title,
    body,
  });

  res.json({ note });
});

// 5. Start server (Fallback to port 5000 if process.env.PORT is undefined)
// Note: change "port" to uppercase "PORT" as it is standard in .env files
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});