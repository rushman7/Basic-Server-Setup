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

module.exports = router;