const express = require('express');
const logger = require('./api/logger');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const projectRouter = require('./routes/projects-router');
const taskRouter = require('./routes/tasks-router');
const resourceRouter = require('./routes/resources-router');

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(morgan("combined"));
server.use(helmet());

server.use('/api/projects', logger(), projectRouter);
server.use('/api/tasks', logger(), taskRouter);
server.use('/api/resources', logger(), resourceRouter);

module.exports = server;