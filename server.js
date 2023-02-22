const express = require("express");
const path = require("path");
const fs = require("fs");
const dbjson = require("./Develop/db/db.json")

const uuid = require("uuid");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
  fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);
    res.json(notes);
  });
});


// receive a new note to sav on the request body, add it to the db.json, and then return the new note to the client
app.post('/api/notes', (req, res) => {
 
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);