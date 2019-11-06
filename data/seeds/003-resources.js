
exports.seed = function(knex) {
  return knex('resources').truncate()
    .then(function () {
      return knex('resources').insert([
        { 
          id: 1, 
          name: "Redux", 
          description: 'sort all data through redux state'
        },
        { 
          id: 2, 
          name: "display react", 
          description: 'display all that data once completed'
        },
        { 
          id: 3, 
          name: "API", 
          description: 'pull from rapid fire HS api'
        }
      ]);
    });
};
