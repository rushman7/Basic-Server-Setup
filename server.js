const express = require('express');
const logger = require('./api/logger');

const projectRouter = require('./projects/projects-router');

const server = express();

server.use('/api/projects', logger(), projectRouter);

module.exports = server;