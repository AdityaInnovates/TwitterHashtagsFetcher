const mongoose = require("mongoose");

const TrendSchema = new mongoose.Schema({
  unique_id: { type: String, required: true },
  AllTrends: { type: Array, required: true },
  date_time: { type: String, required: true },
  ip_address: { type: String, required: true },
});

module.exports = mongoose.model("Trend", TrendSchema);
