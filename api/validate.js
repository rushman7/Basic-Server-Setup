module.exports = { validateID };

const db = require('../data/helpers/projectModel');

function validateID(req, res, next) {
  return db.getProjects(req.params.id)
      .then(project => {
        if (project) {
          req.project = project;
          next();
        } else res.status(404).json({ message: "Invalid id" })
      })
      .catch(() => res.status(500).json({ error: "The project data could not be retrieved." }))
  
}