import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";

const router = express.Router();
const knex = initKnex(configuration);

// for list of comments
router.get("/", async (_req, res) => {
  try {
    const data = await knex("reviews");
    if (data.length === 0) {
        return res.status(404).json({ message: "No reviews found" });
      }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Error retrieving Reviews: ${error}`);
  }
});

// for list of keywords
router.get("/keywords", async (_req, res) => {
    try {
      const data = await knex("keywords");
      if (data.length === 0) {
          return res.status(404).json({ message: "No keywords found" });
        }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).send(`Error retrieving Keywords: ${error}`);
    }
  });

// for specific keyword + reviews
router.get("/keywords/:key", async (req, res) => {
    const { key } = req.params;
    try {
      const data = await knex("keywords")  
      .join("reviews", "reviews.id", "keywords.review_id")
      .select(
        "keywords.id",
        "keywords.keyword",
        "keywords.keyword_rating",
        "reviews.rating",
        "reviews.title",
        "reviews.comment",
        "reviews.user_name",
        "reviews.timestamp",
        "reviews.verified_purchase",
        "reviews.vine_reviewer",
        "reviews.helpful_vote",
      ).where({ keyword: key });
      if (data.length === 0) {
          return res.status(404).json({ message: "No keywords found" });
        }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).send(`Error retrieving Keywords: ${error}`);
    }
  });

export default router;
