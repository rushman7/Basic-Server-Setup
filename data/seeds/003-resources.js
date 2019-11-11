
exports.seed = function(knex) {
  return knex('resources').truncate()
    .then(function () {
      return knex('resources').insert([
        { 
          name: "Redux", 
          description: 'sort all data through redux state',
          project_id: 1, 
        },
        { 
          name: "display react", 
          description: 'display all that data once completed',
          project_id: 2, 
        },
        { 
          name: "API", 
          description: 'pull from rapid fire HS api',
          project_id: 3 
        }
      ]);
    });
};
