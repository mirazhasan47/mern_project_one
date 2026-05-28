// Get all notes
const Note = require("../models/note");
const fetchNotes = async (req, res) => {
  try {
    // Find the notes
    const notes = await Note.find();

    // Respond with them
    res.json({ notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single note by ID
const fetchNote = async (req, res) => {
  try {
    // Get id off the URL
    const noteId = req.params.id;

    // Find the note using that id
    const note = await Note.findById(noteId);

    // Check if note exists
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Respond with the note
    res.json({ note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    // Get the sent in data off request body
    const title = req.body.title;
    const body = req.body.body;

    // Create a note with it
    const note = await Note.create({
      title: title,
      body: body,
    });

    // Respond with the new note
    res.status(201).json({ note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    // Get the id from the URL
    const noteId = req.params.id;

    // Get data from request body
    const title = req.body.title;
    const body = req.body.body;

    // Find and update the note
    const note = await Note.findByIdAndUpdate(
      noteId,
      {
        title: title,
        body: body,
      },
      { new: true }
    );

    // Check if note exists
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Send response
    res.json({ note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    // Get the id from the URL
    const noteId = req.params.id;

    // Find and delete the note
    const note = await Note.findByIdAndDelete(noteId);

    // Check if note exists
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Send response
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};