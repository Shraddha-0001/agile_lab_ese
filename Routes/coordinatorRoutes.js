const coordinatorController = require("./../Controllers/coordinatorControllers");
const loginController = require("./../Controllers/LoginControllers");

const express = require("express");

const Router = express.Router();

const bodyParser = require("body-parser");

// express.use(express.bodyParser())
Router.use(bodyParser.json());

Router.route("/").get(
  loginController.protectCoordinator,
  coordinatorController.coordinatorHome
);

Router.route("/staffAdvisiorDetails")
  .get(
    loginController.protectCoordinator,
    coordinatorController.staffAdvisiorDetails
  )
  .post(coordinatorController.storeStaffAdvisiorDetails);

Router.route("/notifyAll")
  .get(loginController.protectCoordinator, coordinatorController.notifyAll)
  .post(coordinatorController.sendNotification);

module.exports = Router;
