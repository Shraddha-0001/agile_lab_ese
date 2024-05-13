const staffAdvController = require("./../Controllers/staffAdvControllers");
const loginController = require("./../Controllers/LoginControllers");
const express = require("express");

const Router = express.Router();

Router.route("/")
  .get(loginController.protect, staffAdvController.satffAdvHomePage)
  .post();

Router.route("/getTeamDetils")
  .get(loginController.protect, staffAdvController.getDetails)
  .post(staffAdvController.saveDetail);

Router.route("/generateDoc")
  .get(loginController.protect, staffAdvController.getDocdetails)
  .post(staffAdvController.saveDocDetail);

  Router.route("/viewDoc")
  .get(loginController.protect, staffAdvController.viewDoc)
  .post();

module.exports = Router;  
