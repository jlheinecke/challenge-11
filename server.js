const express = require('express');
const path = require('path');
const fs = require('fs');
/* const util = require('util'); */
const jsonData = require('./db/db.json');
const uuid = require('./helpers/uuid');
const PORT = 3001;
const app = express();
app.use(express.json());
app.use(express.static('public'));
// GET Routes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.get('/api/notes', (req, res) => res.json(jsonData));


// POST Routes
app.post('/api/notes', (req, res) => {

  const { title, text } = req.body;

  if (title && text) {
    var newNote = {
      title,
      text,
      note_id: uuid(),
    };

    const response = {
      status: 'success',
      body: newNote,
    };

    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }

  const fsPromises = require('fs').promises;
  fsPromises.readFile('db/db.json', 'utf8')
    .then(data => {
      let json = JSON.parse(data);
      json.push(newNote);
      fsPromises.writeFile('db/db.json', JSON.stringify(json))
        .then(() => { console.log("Note Added"); })
        .catch(err => { console.log("Note Failed " + err); });
    })
    .catch(err => { console.log("Read Error: " + err); });
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);