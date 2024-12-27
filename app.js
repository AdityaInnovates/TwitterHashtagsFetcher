const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fetchHashtagsRoute = require("./routes/fetchHashtags");
const getHashtagsRoute = require("./routes/getHashtags");
require("dotenv").config();
// Initialize Express app
const app = express();
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_SRV;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/fetch-hashtags", fetchHashtagsRoute);
app.use("/get-hashtags", getHashtagsRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
