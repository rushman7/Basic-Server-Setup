const express = require('express');
const logger = require('./api/logger');

const projectRouter = require('./routes/projects-router');
const taskRouter = require('./routes/tasks-router');
const resourceRouter = require('./routes/resources-router');

const server = express();

server.use('/api/projects', logger(), projectRouter);
server.use('/api/projects', logger(), taskRouter);
server.use('/api/projects', logger(), resourceRouter);

module.exports = server;