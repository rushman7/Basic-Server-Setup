
exports.seed = function(knex) {
  return knex('projects').truncate()
    .then(function () {
      return knex('projects').insert([
        {
          name: 'Budget IO',
          description: 'save dat money',
          user_id: 1,
          completed: false
        },
        {
          name: 'HS Deck Builder',
          description: 'build dat deck',
          user_id: 2,
          completed: false
        }
      ]);
    });
};
