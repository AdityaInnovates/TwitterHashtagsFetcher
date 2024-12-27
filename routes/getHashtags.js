const express = require("express");
const router = express.Router();
const Trend = require("../models/Trend");

router.get("/", async (req, res) => {
  try {
    const records = await Trend.find({}, { _id: 0 });
    res
      .status(200)
      .json({ message: "Data retrieved successfully", data: records });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving data", error: error.message });
  }
});

module.exports = router;
