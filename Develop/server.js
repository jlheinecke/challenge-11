const express = require('express');
const path = require('path');
const fs = require('fs');
/* const util = require('util'); */
const jsonData = require('./db/db.json');
const uuid = require('./helpers/uuid');
const PORT = 3002;
const app = express();

app.use(express.json());

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
      console.log(json)
      json.push(newNote);
      console.log(json)
      fsPromises.writeFile('db/db.json', JSON.stringify(json))
        .then(() => { console.log('Append Success'); })
        .catch(err => { console.log("Append Failed: " + err); });
    })
    .catch(err => { console.log("Read Error: " + err); });
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);