module.exports = { validateID, validateProjectBody, validateTask };

const db = require('../data/helpers/projectModel');

function validateID(req, res, next) {
  return db.getProjects(req.params.id)
      .then(project => {
        if (project) {
          req.project = project;
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