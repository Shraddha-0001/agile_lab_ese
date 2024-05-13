// const sportsController=require("./../Controllers/sportsController");

const express=require("express");

const Router=express.Router();
Router.route("/").get().post();



module.exports=Router;