const db = require('../dbConfig');

module.exports = { getUsers, add, getUser }

function getUsers() {
  return db('users as u')
    .select('u.id', 'u.username', 'u.password', 'p.name as project_name')
    .join('projects as p', 'u.id', 'p.user_id');
};

function getUser(user) {
  if (typeof user === "string") return db('users as u')
    .select('u.id', 'u.username', 'u.password', 'p.name as project_name')
    .join('projects as p', 'u.id', 'p.user_id')
    .where('u.id', user);
  else return db('users').where(user).first();
};

function add(user) {
  return db('users').insert(user)
};
