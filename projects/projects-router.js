const express = require('express');

const db = require('./projects-model');

const router = express.Router();

router.get('/', (req, res) => {
  db.getProjects()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json(err))
})


module.exports = router;