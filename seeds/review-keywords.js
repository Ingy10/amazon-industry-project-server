import keywordsData from '../seed-data/keywords.js';

export async function seed(knex) {
  // Deletes all existing entries
  await knex('keywords').del();

  const inserts = [];

  // Loop through each review in the keywords data
  keywordsData.forEach((data) => {
    const keywords = Object.keys(data).filter((key) => key !== 'review_id');
    // Get the keywords excluding 'review_id'

    // For each keyword, create an insert object
    keywords.forEach((keyword) => {
      inserts.push({
        review_id: data.review_id,
        keyword: keyword,
        keyword_rating: data[keyword],
      });
    });
  });

  // Insert the transformed data into the 'keywords' table
  await knex('keywords').insert(inserts);
}
