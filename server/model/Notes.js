import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", NotesSchema);
export default Notes;
