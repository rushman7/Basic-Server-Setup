const express = require('express');

const db = require('../data/helpers/projectModel');
const validate = require('../api/validate');

const router = express.Router();

router.get('/', (req, res) => {
  db.getProjects()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json(err))
})

router.get('/:id', validate.validateID, (req, res) => {
  db.getProjects(req.params.id)
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json(err))
})

router.post('/', (req, res) => {
  console.log("POST", req.body)
  db.insert(req.body)
    .then(() => res.status(201).json(req.body))
    .catch(() => res.status(500).json({ error: 'There was an error while saving the project to the database' }))
})

module.exports = router;