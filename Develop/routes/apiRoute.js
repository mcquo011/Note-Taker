const express = require("express");
const fs = require("fs");
const uuid = require("uuid");

const router = express.Router();

router.get("/notes", (req, res) => {
  fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

router.post("/notes", (req, res) => {
  const newNoteId = uuid.v4();
  const newNote = {
    id: newNoteId,
    title: req.body.title,
    text: req.body.text,
  };
  const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
  notes.push(newNote);
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes));
  res.json(newNote);
});

router.delete("/notes/:id", (req, res) => {
      const noteId = req.params.id;
      const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      fs.writeFileSync("./Develop/db/db.json", JSON.stringify(updatedNotes));
      res.json(updatedNotes);
})

module.exports = router;
