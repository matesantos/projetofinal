
exports.up = function(knex) {
    return knex.schema.alterTable('users', table => {
        table.boolean('admin').alter();
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable('users', table => {
        table.string('admin').alter();
    })
};
