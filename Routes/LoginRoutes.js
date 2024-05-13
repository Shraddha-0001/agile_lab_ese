const loginController = require("./../Controllers/LoginControllers");

const express = require("express");
const Router = express.Router();



Router.route("/studentLogin")
  .get(loginController.studentLogin)
  .post(loginController.studentLoginAuth);
Router.route("/coordinator")
  .get(loginController.coordinatorLogin)
  .post(loginController.coordinatorLoginAuth);
Router.route("/staffAdvisior")
  .get(loginController.staffAdvisiorLogin)
  .post(loginController.staffAdvisiorLoginAuth);

Router.route("/coordinatorOTP").post(loginController.checkOTP);

module.exports = Router;
