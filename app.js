const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fetchHashtagsRoute = require("./routes/fetchHashtags");
const getHashtagsRoute = require("./routes/getHashtags");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const mongoURI = process.env.MONGODB_SRV;
try {
  mongoose.connect(mongoURI, {});
} catch (error) {
  console.log(`Error: ${error.message}`);
}

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err.message}`);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/fetch-hashtags", fetchHashtagsRoute);
app.use("/get-hashtags", getHashtagsRoute);

const PORT = 3456;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
