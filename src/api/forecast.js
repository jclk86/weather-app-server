const express = require("express");
const forecastController = require("../controller/forecastController");
const { catchAsync } = require("./utilities");

const forecastRouter = express.Router();

// get or post?
forecastRouter.get("/forecast/:zipCode", catchAsync(forecastController));

module.exports = forecastRouter;
