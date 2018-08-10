const express = require('express');
const db = require('./data/db');
const server = express();

server.use(express.json());

const PORT = 8000;

server.get('/projects', (req, res) => {
  db('projects')
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

server.post('/projects', (req, res) => {
  const project = req.body;
  db.insert(project).into('projects')
    .then(response => {
      res.status(200).json({project});
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})
