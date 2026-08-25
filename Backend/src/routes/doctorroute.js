const express = require("express");
const { allDoctor} = require("../controllers/doctorcontroller");

const doctorRouter = express.Router();

doctorRouter.get("/alldoctors", allDoctor);

module.exports = doctorRouter;