const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');

const projectRouter = require('./routes/projects-router');
const taskRouter = require('./routes/tasks-router');
const resourceRouter = require('./routes/resources-router');
const userRouter = require('./routes/user-router');
const middleware = require('./api/middleware');

const sessionConfig = {
  name: 'userID', // sid
  secret: 'useID credential data.',
  cookie: {
    maxAge: 1000 * 120,
    secure: false, // true in production
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
}

const server = express();
server.use(session(sessionConfig))
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(morgan("combined"));
server.use(helmet());

server.use('/api/projects',  projectRouter);
server.use('/api/tasks',  taskRouter);
server.use('/api/resources',  resourceRouter);
server.use('/api', userRouter);

module.exports = server;