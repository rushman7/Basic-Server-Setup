const express = require('express');

const db = require('../data/helpers/resourceModel');
const middleware = require('../api/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  db.getResources()
    .then(resources => res.status(200).json(resources))
    .catch((err) => res.status(500).json(err));
})

router.get('/:id', middleware.validateID, (req, res) => {
  db.getResources(req.params.id)
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json(err))
})

router.post('/', middleware.validateID, middleware.validateResource, (req, res) => {
  db.insert(req.body)
    .then(() => res.status(201).json(req.body))
    .catch(err => res.status(500).json(err))
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.getResource(id)
    .then(resource => {
      if (resource) db.update(changes, id).then(updatedResource => res.json(updatedResource));
      else res.status(404).json({ message: 'Could not find resource with given id' });
    })
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) res.json({ message: `Resource with id ${id} has been removed.` });
      else res.status(404).json({ message: 'Could not find resource with given id.' });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;