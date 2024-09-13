import reviewData from '../seed-data/reviews.js';

export async function seed(knex) {
  // Deletes all existing entries
  await knex('reviews').del();

  // Ensuring images field is set to NULL if missing or empty
  const inserts = reviewData.map((review) => ({
    ...review,
    images:
      review.images && review.images.length > 0
        ? JSON.stringify(review.images)
        : null,
    // Set images to NULL if it's missing or empty
  }));

  // Insert the transformed data into the 'reviews' table
  await knex('reviews').insert(inserts);
}
