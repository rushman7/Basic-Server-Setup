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

router.post('/:id', middleware.validateID, middleware.validateTask, (req, res) => {
  db.insert(req.params.id, req.body)
    .then(() => res.status(201).json(req.body))
    .catch(() => res.status(500).json({ error: 'There was an error while saving the task to the database' }))
})

module.exports = router;