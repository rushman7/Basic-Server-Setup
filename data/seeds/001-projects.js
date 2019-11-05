
exports.seed = function(knex) {
  return knex('projects').truncate()
    .then(function () {
      return knex('projects').insert([
        {
          id: 1, 
          name: 'Budget IO',
          description: 'save dat money',
          completed: false
        },
        {
          id: 2, 
          name: 'HS Deck Builder',
          description: 'build dat deck',
          completed: false
        }
      ]);
    });
};
