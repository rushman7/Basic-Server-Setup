module.exports = { 
  validateID, 
  validateProjectBody, 
  validateTask,
  validateResource,
  validateCredentialBody,
  restricted
};

const db = require('../data/helpers/projectModel');
const bcrypt = require('bcryptjs');

function validateID(req, res, next) {
  return db.getProjects(req.params.id)
      .then(project => {
        if (project) {
          next();
        } else res.status(404).json({ message: "Invalid id." })
      })
      .catch(() => res.status(500).json({ error: "The project data could not be retrieved." }))
}

function validateProjectBody(req, res, next) {
  if (!req.body) res.status(400).json({ message: "Missing multiple BODY inputs." })
  else if (!req.body.name) res.status(400).json({ message: "Missing required name input." })
  else next();
}

function validateTask(req, res, next) {
  if (!req.body) res.status(400).json({ message: "Missing multiple BODY inputs." })
  else if (!req.body.description || !req.body.project_id) res.status(400).json({ message: "Missing required description or project_id input." })
  else next();
}

function validateResource(req, res, next) {
  if (!req.body) res.status(400).json({ message: "Missing multiple BODY inputs." })
  else if (!req.body.name) res.status(400).json({ message: "Missing required name or project_id input." })
  else next();
}

function validateCredentialBody(req, res, next) {
  const { username, password } = req.body;

  if (!req.body) res.status(400).json({ message: "Missing multiple BODY inputs." })
  else if (!username || !password) res.status(400).json({ message: "Missing username or password." })
  else next();
}

function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    db.getUsers({ username })
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) next();
        else res.status(401).json({ error: `Invalid credentials.` })
      })
      .catch(err => res.status(500).json(err))
  } else res.status(401).json({ message: 'Please provide valid credentials.' })
}