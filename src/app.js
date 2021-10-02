const express = require("express");
const app = express();
const api = require("./api");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("morgan");

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Origin", "Content-Type", "Accept"],
  })
);

// api routes
app.use(api);

app.get("/", (req, res) => {
  res.status(404).send({ error: { message: "Page Not Found" } });
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
