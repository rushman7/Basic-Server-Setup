const express = require('express');

const db = require('../data/helpers/resourceModel');
const middleware = require('../api/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  db.getResources()
    .then(resources => res.status(200).json(resources))
    .catch(err => console.log(err))
})

router.get('/:id', middleware.validateID, (req, res) => {
  db.getResources(req.params.id)
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json(err))
})

router.post('/', middleware.validateID, middleware.validateResource, (req, res) => {
  db.insert(req.body)
    .then(() => res.status(201).json(req.body))
    .catch(err => console.log(err))
})

module.exports = router;