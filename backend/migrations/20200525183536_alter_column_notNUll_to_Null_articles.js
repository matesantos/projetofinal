
exports.up = function(knex,Promise) {
  return knex.schema.alterTable('articles', table => {
      table.string('imageUrl').nullable().alter();
  })
};

exports.down = function(knex,Promise) {
    return knex.schema.alterTable('articles', table => {
        table.string('imageUrl').notNullable().alter();
    })
};
