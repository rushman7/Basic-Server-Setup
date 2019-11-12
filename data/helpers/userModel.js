const db = require('../dbConfig');
const mappers = require('./mappers');

module.exports = { getUsers, add, getProjects }

function getUsers(id) {
  let query = db('users as u')
    .select('u.id', 'u.username', 'u.password')
    .join('projects as p', 'u.id', 'p.user_id');

  if (id) {
    query.where('u.id', id).first();

    return Promise.all([query, this.getProjects(id)])
      .then(function(results) {
        let [user, projects] = results

        if (user) {
          user.projects = projects;

          return mappers.userToBody(user)
        } else {
          return null;
        }
      })
  }

  return query
};

function add(user) {
  return db('users').insert(user)
};

function getProjects(id) {
  let query = db('projects as p').select('p.name', 'p.description', 'p.completed')
  
  return query.where('p.user_id', id);
}
