const express = require("express");
const forecastController = require("../controller/forecastController");

const forecastRouter = express.Router();

/*
 * caller function for global error handling
 * route all calls through this to try and handle errors
 */

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

forecastRouter.get("/forecast", use(forecastController));

module.exports = forecastRouter;
