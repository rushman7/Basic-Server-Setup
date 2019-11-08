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
    .catch(() => res.status(500).json({ error: 'There was an error while saving the project to the database' }))
})

module.exports = router;