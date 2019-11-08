
exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {
          username: 'Arthur',
          password: 'password'
        },
        {
          username: 'Katie',
          password: 'password'
        }
      ]);
    });
};
