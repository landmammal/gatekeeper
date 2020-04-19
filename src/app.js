// to access variables use process.env.NAMEOFVARIABLE
require("dotenv/config");

const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const errorHandler = require("../config/middleware/error_handler");

// starting application
const app = express();

// Database connection??

// parse incoming request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// application middleware
app.use(cors()); // handles crossorigin request default is *

// Route Management
app.use(routes);

// Global error handler
app.use(errorHandler);

module.exports = app;
