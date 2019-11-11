const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {
          username: 'Arthur',
          password: bcrypt.hashSync("password1")
        },
        {
          username: 'Katie',
          password: bcrypt.hashSync("password2")
        },
        {
          username: 'Ronny',
          password: bcrypt.hashSync("password3")
        },
      ]);
    });
};
