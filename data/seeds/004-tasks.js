
exports.seed = function(knex) {
  return knex('tasks').truncate()
    .then(function () {
      return knex('tasks').insert([
        { 
          project_id: 1, 
          notes: "order by amount", 
          description: 'set the order by amount in redux',
          completed: false
        },
        { 
          project_id: 1, 
          notes: "order by date", 
          description: 'set the order by date in redux',
          completed: false
        },
        { 
          project_id: 2, 
          notes: "pull from api", 
          description: 'pull all the data from the api',
          completed: false
        },
      ]);
    });
};
