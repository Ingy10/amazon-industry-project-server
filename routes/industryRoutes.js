import express from "express";

const router = express.Router();

router.post("/review/add", async (req, res) => {
  try {
    if (!req.body.title || !req.body.description) {
      res.status(400).json("Title and review description are required");
    }

    const updatedReviews = await knex("reviews").insert(req.body);
    const newReviewId = updatedReviews[0];
    const newReview = await knex("reviews")
      .where({ id: newReviewId })
      .select("*");
    res.status(200).json(newReview[0]);
  } catch (error) {
    res.status(500).json(`${error}`);
  }
});

export default router;
