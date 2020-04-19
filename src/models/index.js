require("dotenv/config");
const config = require("../../config/config.json");
const mongoose = require("mongoose");

// models
const User = require("./user");

mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

mongoose.Promise = global.Promise;

module.exports = {
  User: User,
};
