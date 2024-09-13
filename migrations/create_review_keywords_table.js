export function up(knex) {
  return knex.schema.createTable('keywords', (table) => {
    table.increments('id').primary();
    table.integer('review_id').unsigned();
    table.foreign('review_id').references('id').inTable('reviews');
    table.string('keyword', 255).notNullable();
    table.float('keyword_rating', 2, 1);
  });
}

export function down(knex) {
  return knex.schema.dropTable('keywords');
}
