const db = require('../dbConfig');
const mappers = require('./mappers');

module.exports = { getTask, insert, getTasks }

function getTasks() {
  return db('tasks')
    .then(tasks => tasks.map(task => mappers.taskToBody(task)))
}

function getTask(id) {
  return db('tasks')
    .where('project_id', id)
    .then(tasks => tasks.map(task => mappers.taskToBody(task)))
}

function insert(id, task) {
  return db('tasks')
    .where({ 'project_id': id })
    .insert(task);
}
