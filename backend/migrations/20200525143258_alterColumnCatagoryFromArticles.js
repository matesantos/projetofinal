
exports.up = function(knex) {
    return knex.schema.table('articles', table => {
        table.renameColumn('catagoryId', 'categoryId')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('articles')
};
