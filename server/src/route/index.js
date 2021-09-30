const express = require("express");
const weatherRouter = require("./weather");

const router = express.Router();

router.use(weatherRouter);

export default router;
