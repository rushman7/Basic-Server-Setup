const db = require('../dbConfig');
const mappers = require('./mappers');

module.exports = { getResources, insert }

// function getResources(id) {
//   let query = db('resources as r');

//   if (id) {
//     return query
//       .where('project_id', id)
//       .then(resources => resources.map(resource => mappers.resourceToBody(resource)))
//   }

//   return query
//     .select('r.id', 'r.name', 'r.description', 'r.project_id')
//     .then(resources => resources.map(resource => resource))
// }

function getResources() {
  return db('resources')
}

function insert(id, resource) {
  return db('resources')
    .where({ 'project_id': id })
    .insert(resource);
}
