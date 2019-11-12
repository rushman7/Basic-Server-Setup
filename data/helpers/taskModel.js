const db = require('../dbConfig');
const mappers = require('./mappers');

module.exports = { getTask, insert, getTasks, update, remove }

function getTasks() {
  return db('tasks')
    .then(tasks => tasks.map(task => mappers.projectToBody(task)))
}

function getTask(id) {
  return db('tasks')
    .where('project_id', id)
    .then(tasks => tasks.map(task => mappers.projectToBody(task)))
}

function insert(id, task) {
  return db('tasks')
    .where({ id })
    .insert(task);
}

function update(changes, id) {
  return db('tasks')
    .where({ id })
    .update(changes)
}

function remove(id) {
  return db('tasks').where({ id }).del()
}