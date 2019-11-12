const express = require('express');

const db = require('../data/helpers/projectModel');
const middleware = require('../api/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  db.getProjects()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json(err))
})

router.get('/:id', middleware.validateID, (req, res) => {
  db.getProjects(req.params.id)
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json(err))
})

router.post('/', middleware.validateProjectBody, (req, res) => {
  db.insert(req.body)
    .then(() => res.status(201).json(req.body))
    .catch((err) => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.getProjects(id)
  .then(project => {
    if (project) db.update(changes, id).then(updatedProject => res.json(updatedProject));
    else res.status(404).json({ message: 'Could not find project with given id' });
  })
  .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) res.json({ message: `Project with id ${id} has been removed.` });
      else res.status(404).json({ message: 'Could not find project with given id' });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;