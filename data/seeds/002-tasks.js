
exports.seed = function(knex) {
  return knex('tasks').truncate()
    .then(function () {
      return knex('tasks').insert([
        { 
          id: 1, 
          project_id: 1, 
          notes: "this is the first task", 
          description: 'complete the first task',
          completed: false
        },
        { 
          id: 2, 
          project_id: 1, 
          notes: "this is the second task", 
          description: 'complete the second task',
          completed: false
        },
        { 
          id: 3, 
          project_id: 2, 
          notes: "this is the first task of the second project", 
          description: 'complete the first task of project number 2',
          completed: false
        },
      ]);
    });
};
