const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/helpers/userModel');
const middleware = require('../api/middleware');

const router = express.Router();

router.get('/users', (req, res) => {
  db.getUsers(req.session.user)
    .then(users => res.status(200).json(users))
    .catch(err => console.log(err))
})

router.get('/user/:id', (req, res) => {
  db.getUser(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err))
})

router.post('/register', middleware.validateCredentialBody, (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 14);

  credentials.password = hash;

  db.add(credentials)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json(err))
})

router.post('/login', middleware.validateCredentialBody, (req, res) => {
  const { username, password } = req.body;

  db.getUser({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = middleware.generateToken(user);

        req.session.user = user;
        res.status(201).json({
           message: `Logged in, welcome ${user.username}!`,
           token,
        })
      } else res.status(401).json({ error: `Invalid credentials.` })
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router;