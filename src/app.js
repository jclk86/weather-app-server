const express = require("express");
const app = express();
const api = require("./api");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("morgan");
const errorHandler = require("./errorhandling/errorHandler");
const AppError = require("./errorhandling/AppError");
const settings = require("./settings");

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: settings.client_origin,
    allowedHeaders: ["Origin", "Content-Type", "Accept"],
  })
);

// api routes
app.use(api);

app.use((req, res, next) => {
  next(new AppError("Not Found.", 404));
});

app.use(errorHandler);

module.exports = app;
