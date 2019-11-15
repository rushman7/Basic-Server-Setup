module.exports = { 
  validateID, 
  validateProjectBody, 
  validateTask,
  validateResource,
  validateCredentialBody,
  restricted,
  generateToken
};

const projectDB = require('../data/helpers/projectModel');
const jwt = require('jsonwebtoken');

function validateID(req, res, next) {
  return projectDB.getProjects(req.params.id)
      .then(project => {
        if (project) {
          next();
        } else res.status(404).json({ message: "Invalid id." })
      })
      .catch(() => res.status(500).json({ error: "The project data could not be retrieved." }))
}

function validateProjectBody(req, res, next) {
  if (!req.body) res.status(400).json({ message: "Missing multiple BODY inputs." })
  else if (!req.body.user_id) res.status(400).json({ message: "Missing required user_id input." })
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

// function restricted(req, res, next) {
//   if (req.session && req.session.user) next();
//   else res.status(401).json({ message: 'Please log in.' })
// }

function restricted(req, res, next) {
  const token = req.headers.authorization
  if(token){
      const secret = 'qwdqwldq9u129dj1l2du1o2d12';

      jwt.verify(token, secret, (error, decodedToken) => {
          if(error){
              res.status(401).json({message: `tampered token. invalid creds.`})
          }
          else{
              res.decodeJwt = decodedToken;
              next();
          }
      })
  }
  else{
      res.status(400).json({ message: 'No credentials provided' });
}
}


function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const secret = 'qwdqwldq9u129dj1l2du1o2d12';
  const options = {
    expiresIn: '8h',
  };

  return jwt.sign(payload, secret, options)
}