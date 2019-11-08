const db = require('../dbConfig');

module.exports = { getUsers, add }

function getUsers(username) {
  let query = db('users as u');

  if (username) query.where(username).first();

  return query
    .select('u.id', 'u.username', 'u.password', 'p.name')
    .join('projects as p', 'u.id', 'p.user_id');
};

function add(user) {
  return db('users').insert(user)
}
