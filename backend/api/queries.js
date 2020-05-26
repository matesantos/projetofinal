module.exports = {
    categoryWithChildren:`
        WITH RECURSIVE subcategories (id) AS(
            SELECT id FROM categories WHERE id = ?
            UNION ALL
            SELECT c.id FROM subcategories, categories c
            WHERE "parenteId" =  subcategories.id
        )
        SELECT id FROM subcategories
    `
}