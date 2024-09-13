export function up(knex) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments('id').primary();
    table.float('rating', 2, 1);
    table.string('title', 255).notNullable();
    table.text('comment').notNullable();
    table.json('images').nullable();
    table.string('asin');
    table.string('parent_asin');
    table.string('user_name');
    table.bigInteger('timestamp');
    table.boolean('verified_purchase');
    table.boolean('vine_reviewer');
    table.integer('helpful_vote').nullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('reviews');
}
