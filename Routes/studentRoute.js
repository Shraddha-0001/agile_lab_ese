const studentcontroller = require("./../Controllers/studentcontroller");
const loginController = require("./../Controllers/LoginControllers");

const express = require("express");

const Router = express.Router();

const bodyParser = require("body-parser");
//  Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());

Router.route("/StudentUploadDocs")
  .get(loginController.protectStudent, studentcontroller.uploadDocget)
  .post(studentcontroller.uploadDocpost);

module.exports = Router;
