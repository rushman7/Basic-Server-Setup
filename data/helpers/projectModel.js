const db = require('../dbConfig');
const mappers = require('./mappers');
const taskMiddleware = require('./taskModel');
const resourceMiddleware = require('./resourceModel');

module.exports = { getProjects, insert }

function getProjects(id) {
  let query = db('projects as p')
    .select('p.id as project_id', 'p.name', 'p.description', 'p.completed', 'u.username as student')
    .join('users as u', 'u.id', 'p.user_id');
  
  if (id) {
    query.where('p.id', id).first();

    return Promise.all([query, taskMiddleware.getTask(id), resourceMiddleware.getResources(id)])
      .then(function(results) {
        let [project, tasks, resources] = results

        if (project) {
          project.tasks = tasks;
          project.resources = resources;

          return mappers.projectToBody(project)
        } else {
          return null;
        }
      });
  }

  return query.then(projects => projects.map(project => mappers.projectToBody(project)))
};

function insert(project) {
  return db('projects')
    .insert(project)
}
