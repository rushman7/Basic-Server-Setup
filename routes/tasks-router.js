const express = require('express');

const db = require('../data/helpers/taskModel');
const validate = require('../api/validate');

const router = express.Router();

router.get('/:id', validate.validateID, (req, res) => {
  db.getTasks(req.params.id)
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json(err))
})

router.post('/:id', validate.validateID, validate.validateTask, (req, res) => {
  db.insert(req.params.id, req.body)
    .then(() => res.status(201).json(req.body))
    .catch(() => res.status(500).json({ error: 'There was an error while saving the task to the database' }))
})

module.exports = router;