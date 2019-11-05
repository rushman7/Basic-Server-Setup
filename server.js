const express = require('express');

const projectRouter = require('./projects/projects-router');

const server = express();

server.use('/api/projects', projectRouter);

module.exports = server;