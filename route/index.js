const express = require("express");
const forecastRouter = require("./forecast");

const router = express.Router();

router.use(forecastRouter);

export default router;
