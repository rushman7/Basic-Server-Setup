const db = require('../dbConfig');

module.exports = { getResources, insert }

function getResources(id) {
  if (id) {
    return db('projects as p')
      .join('resources as r', 'p.id', 'r.project_id')
      .select('r.id', 'r.name', 'r.description', 'r.project_id')
      .where('p.id', id)
  } else {
    return db('resources')
  }
}

function insert(resource) {
  return db('resources')
    .insert(resource)
    .then(ids => getResources(ids[0]))
}
