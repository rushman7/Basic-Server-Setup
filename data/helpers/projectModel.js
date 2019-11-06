const db = require('../dbConfig');
const mappers = require('./mappers');

module.exports = { getProjects, getTasks, getResources, insert }

function getProjects(id) {
  let query = db('projects as p');
  
  if (id) {
    query.where('p.id', id).first();

    return Promise.all([query, this.getTasks(id), this.getResources(id)])
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

  return query
    .select('p.id', 'p.name', 'p.description', 'p.completed')
    .then(projects => projects.map(project => mappers.projectToBody(project)))
};

function getTasks(id) {
  return db('tasks')
    .where('project_id', id)
    .then(tasks => tasks.map(task => mappers.taskToBody(task)))
}

function getResources(id) {
  return db('projects as p')
    .join('projects_resources as pr', 'p.id', 'pr.project_id')
    .join('resources as r', 'pr.resource_id', 'r.id')
    .where('p.id', id)
    .then(resources => resources.map(resource => mappers.resourceToBody(resource)))
}

function insert(project) {
  return db('projects')
    .insert(project)
}
