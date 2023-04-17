import express from "express";
import Notes from "../model/notes.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { title, content } = req.body;
    // add note to database
    const newNote = new Notes({
      title,
      content,
    });
    const savednote = await newNote.save();
    res.status(201).json(savednote);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.findById(id);
    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const notes = await Notes.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Notes.findByIdAndRemove(id);
    res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Notes.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

export default router;
