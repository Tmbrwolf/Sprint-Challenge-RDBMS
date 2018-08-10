
exports.up = function(knex, Promise) {
  return knex.schema.createTable('actions', action => {
    action.increments();
    action.string('name').notNullable().unique();
    action.text('description').notNullable();
    action.boolean('completed').defaultTo(false);
    action.integer('action_id').references('id').inTable('projects');
  })
};

exports.down = function(knex, Promise) {

};
