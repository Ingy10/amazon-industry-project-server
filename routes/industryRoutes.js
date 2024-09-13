import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";

const router = express.Router();
const knex = initKnex(configuration);

// for list of warehouses
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

export default router;
