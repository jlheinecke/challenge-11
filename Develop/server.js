const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const jsonData = require('./db/db.json');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

const PORT = 3002;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.use(express.static('public')); */

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

const termData = 'Hi'
/* app.get('/api/notes', (req, res) =>
  res.json(path.join(__dirname, '/db/db.json'))
); */
app.get('/api/notes', (req, res) => res.json(jsonData));



// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);