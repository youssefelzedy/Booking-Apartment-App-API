const mongoose = require("mongoose");
const dotenv = require("dotenv");



dotenv.config({ path: './config.env' });
const app = require("./app");

mongoose
  .connect("mongodb://localhost:27017/Airbnb")
  .then(() => {
    console.log("DB connection successful 🥳");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB 💥", err);
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
