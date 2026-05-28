// 1. Load environment variables first thing!
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// 2. Import dependencies
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const notesController = require("../mern ecommerce app/controllers/notesController");

// 3. Create app and connect to DB
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies 
app.use(cors());
connectToDb();

// 4. Routing
app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

// Routing
app.get("/notes", notesController.fetchNotes);
app.get("/notes/:id", notesController.fetchNote);

app.post("/notes", notesController.createNote);

app.put("/notes/:id", notesController.updateNote);

app.delete("/notes/:id", notesController.deleteNote);

// Start our server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// 5. Start server (Fallback to port 5000 if process.env.PORT is undefined)
// Note: change "port" to uppercase "PORT" as it is standard in .env files
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});