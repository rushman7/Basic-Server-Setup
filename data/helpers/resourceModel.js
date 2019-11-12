const db = require('../dbConfig');

module.exports = { getResources, insert }

function getResources(id) {
  if (id) return db('projects as p')
    .join('resources as r', 'p.id', 'r.project_id')
    .select('r.id', 'r.name', 'r.description', 'p.name')
    .where('p.id', id)
  else return db('projects as p')
    .join('resources as r', 'p.id', 'r.project_id')
    .select('r.id', 'r.name', 'r.description', 'p.name as project')
}

function insert(resource) {
  return db('resources')
    .insert(resource)
    .then(ids => getResources(ids[0]))
}
