const db = require('../dbConfig');
const mappers = require('./mappers');

module.exports = { getTasks, insert }

function getTasks(id) {
  return db('tasks')
    .where('project_id', id)
    .then(tasks => tasks.map(task => mappers.taskToBody(task)))
}

function insert(id, task) {
  return db('tasks')
    .where({ 'project_id': id })
    .insert(task);
}
