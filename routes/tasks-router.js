const express = require('express');

const db = require('../data/helpers/taskModel');
const middleware = require('../api/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  db.getTasks()
    .then(tasks => res.status(200).json(tasks))
    .catch(err => res.status(500).json(err))
})

router.get('/:id', middleware.validateID, (req, res) => {
  db.getTask(req.params.id)
    .then(tasks => res.status(200).json(tasks))
    .catch(err => res.status(500).json(err))
})

router.post('/', middleware.validateID, middleware.validateTask, (req, res) => {
  db.insert(req.body.project_id, req.body)
    .then(() => res.status(201).json(req.body))
    .catch(err => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.getTask(id)
    .then(task => {
      if (task) db.update(changes, id).then(updatedTask => res.json(updatedTask));
      else res.status(404).json({ message: 'Could not find task with given id.' });
    })
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) res.json({ message: `Task with id ${id} has been removed.` });
      else res.status(404).json({ message: 'Could not find task with given id.' });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;