const express = require("express");
const LoginRoute = require("./Routes/LoginRoutes");
const HomeRoute = require("./Routes/HomeRoutes");
const coordinatorRoute = require("./Routes/coordinatorRoutes");
const StaffAdvRouter = require("./Routes/staffAdvRoutes");
const signinRoute= require("./Routes/signupRoute");
const studentRoute=require("./Routes/studentRoute");

const cookieParser = require("cookie-parser");

const path = require("path");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.set("view engine", "ejs");
app.set(path.join(__dirname, "public"));
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
//change

app.use(bodyParser.json());

app.use("/", HomeRoute);
app.use("/login", LoginRoute);
app.use("/signin",signinRoute); 
app.use("/login/coordinatorLogin", coordinatorRoute);
app.use("/login/staffAdvLogin", StaffAdvRouter);
app.use("/login/studentLogin", studentRoute);

app.use("/sigin/studentsignin", signinRoute);


module.exports = app;
