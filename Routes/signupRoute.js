const signupcontroller = require("./../Controllers/signupcontroller");

const express = require("express");
const Router = express.Router();



Router.route("/studentsignin")
    .get(signupcontroller.studentsignin)
    .post(signupcontroller.storeStudentDetails);

module.exports = Router;