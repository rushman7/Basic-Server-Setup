const db = require('../dbConfig');
const mappers = require('./mappers');

module.exports = { getResources, insert }

function getResources(id) {
  if (id) {
    return db('projects as p')
      .join('projects_resources as pr', 'p.id', 'pr.project_id')
      .join('resources as r', 'pr.resource_id', 'r.id')
      .select('r.id', 'r.name', 'r.description', 'pr.project_id')
      .where('p.id', id)
  } else {
    return db('resources')
  }
}

function insert(resource) {
  return db('resources')
    .insert(resource);
}
