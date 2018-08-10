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

server.get('/projects/:id', (req, res) => {
  const { id } = req.params;
  db('projects')
    .where("id", id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const project = req.body;
  db('projects')
    .where("id", id)
    .update(project)
    .then(project => {
      res.status(201).json({project});
    })
    .catch(error => res.status(500).json({error}));
});

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  db('projects')
    .where({ id })
    .del()
    .then(response => {
      res.status(200).json(`${id} is deleted.`);
    })
    .catch(error => {
      res.status(500).json({error});
    });
});


server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})
