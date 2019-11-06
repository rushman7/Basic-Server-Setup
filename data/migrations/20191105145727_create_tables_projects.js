
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', table => {
      table.increments();
      table.string('name', 128).notNullable();
      table.string('description', 256);
      table.boolean('completed').defaultTo(false);
    })
    .createTable('tasks', table => {
      table.increments();
      table.string('description', 256).notNullable();
      table.string('notes', 256);
      table.boolean('completed').defaultTo(false);
      table
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('projects.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('resources', table => {
      table.increments();
      table.string('name', 128).notNullable().unique();
      table.string('description', 256);
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references('projects.id')
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects')
};