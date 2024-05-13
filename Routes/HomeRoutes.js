const homeControllers=require("./../Controllers/HomeControllers");

const express=require("express");

const Router=express.Router();

Router.route("/navbar").get(homeControllers.navBar);
Router.route("/").get(homeControllers.homePage);
Router.route("/about-us").get(homeControllers.aboutUs);
Router.route("/gym").get(homeControllers.gym);
Router.route("/sports").get(homeControllers.sports);


module.exports=Router;