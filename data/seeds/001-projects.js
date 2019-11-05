
exports.seed = function(knex) {
  return knex('projects').truncate()
    .then(function () {
      return knex('projects').insert([
        {
          id: 1, 
          name: 'project name here',
          description: 'the project description',
          completed: false
        },
        {
          id: 2, 
          name: 'second project',
          description: 'the second project description',
          completed: false
        }
      ]);
    });
};
