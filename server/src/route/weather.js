const express = require("express");
const weatherController = require("../controller/weatherController");

const weatherRouter = express.Router();

weatherRouter.get("/forecast", weatherController);

module.export = weatherRouter;
