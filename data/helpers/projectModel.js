const db = require('../dbConfig');
const mappers = require('./mappers');

module.exports = { get }

function get(id) {
  let query = db('projects as p');
  
  // if (id) {

  // }

  return query.then(projects => projects.map(project => mappers.projectToBody(project)))
};