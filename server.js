const express = require("express");
const path = require("path");
const fs = require("fs");
const dbjson = require("./Develop/db/db.json")

const uuid = require("uuid");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Develop/public"));

app.get("/api/notes", (req, res) => {
  fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);
    res.json(notes);
  });
});


// receive a new note to sav on the request body, add it to the db.json, and then return the new note to the client

app.post('/api/notes', (req, res) => {
  // generate a unique ID for the new note
  const newNoteId = uuid.v4();
  // create a new note object with the provided request body and generated ID
  const newNote = {
    id: newNoteId,
    title: req.body.title,
    text: req.body.text
  };
  // read the current notes from db.json
  const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
  // add the new note to the array of notes
  notes.push(newNote);
  // write the updated notes back to db.json
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes));
  // return the new note as the response
  res.json(newNote);
});

// get call for notes.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);