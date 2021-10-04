const express = require("express");
const forecastController = require("../controller/forecastController");
const { catchAsync } = require("./utilities");

const forecastRouter = express.Router();

forecastRouter.get("/api/forecast/:zipCode", catchAsync(forecastController));

module.exports = forecastRouter;
