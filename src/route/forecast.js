const express = require("express");
const forecastController = require("../controller/forecastController");

const forecastRouter = express.Router();

forecastRouter.get("/forecast", forecastController);

module.export = forecastRouter;
