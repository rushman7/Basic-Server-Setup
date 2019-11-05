
exports.seed = function(knex) {
  return knex('resources').truncate()
    .then(function () {
      return knex('resources').insert([
        { 
          id: 1, 
          project_id: 1, 
          name: "this is the first resource", 
          description: 'the first resource'
        },
        { 
          id: 2, 
          project_id: 1, 
          name: "this is the second resource", 
          description: 'the second resource'
        },
        { 
          id: 3, 
          project_id: 2, 
          name: "this is the first resource of the second project", 
          description: 'the first resource of project number 2'
        },
        { 
          id: 2, 
          project_id: 2, 
          name: "this is the second resource", 
          description: 'the second resource'
        },
      ]);
    });
};
