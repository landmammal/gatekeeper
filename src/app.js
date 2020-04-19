// to access variables use process.env.NAMEOFVARIABLE
import "dotenv/config";
import cors from "cors";
import express from "express";

import routes from "../routes";

// starting application
const app = express();

// Database connection??

// parse incoming request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// application middleware
app.use(cors()); // handles crossorigin request defaul is *

// Route Management
app.use(routes);

// Global error handler
app.use(errorHandler);

module.exports = app;
