const StaffAdvDetails = require("./../Models/staffAdvisiorDetailsSchema");
const studentsignin = require("./../Models/studentsignin");
const nodemailer = require("nodemailer");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.coordinatorLogin = (req, res) => {
  res.render("coordinatorLogin");
};

exports.staffAdvisiorLogin = (req, res) => {
  res.render("staffAdvisiorLogin");
};

exports.studentLogin = (req, res) => {
  res.render("studentLogin");
};

//change

let correctPassword = async function (enterPassword, userPassword) {
  const bo = await brcypt.compare(enterPassword, userPassword);
  return bo;
};

let OTP;

exports.coordinatorLoginAuth = async (req, res) => {
  const enterEmail = req.body.Email;
  OTP = Math.floor(Math.random() * 9000) + 1000;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ddubey10032003@gmail.com",
      pass: "qcifrzphugnukief",
    },
  });

  if (enterEmail == "ddubey10032002@gmail.com") {
    transporter.sendMail(
      {
        from: "ddubey10032003@gmail.com",
        to: "ddubey10032002@gmail.com",
        subject: "Your OTP",
        text: `${OTP}`,
      },
      (err, info) => {
        if (err) {
          console.log(err);
          res.redirect("/login/coordinator");
        } else {
          console.log(OTP);
          res.render("coordinatorOTP");
        }
      }
    );
  } else {
    res.redirect("/login/coordinator");
    console.log("enter correct email");
  }
};

exports.checkOTP = (req, res) => {
  let enterOTP = Number(req.body.OTP);
  if (enterOTP === OTP) {
    const secret = "my-secret-string-used-in-formation-of-token";
    const expiresIn = 3 * 24 * 60 * 60;
    const _id = "6354de1fcdb6219dd19828e5";
    const token = jwt.sign({ _id }, secret, {
      expiresIn,
    });

    res.cookie("Cor", token, {
      httpOnly: true,
      expiresIn: expiresIn * 1000,
    });
    res.status(201).redirect("/login/coordinatorLogin");
  } else {
    console.log(enterOTP);
    res.redirect("/login/coordinator");
  }
};

exports.staffAdvisiorLoginAuth = async (req, res) => {
  const { fid, password } = req.body;
  if (!fid || !password) {
    res.redirect("/login/staffAdvisior");
  } else {
    const user = await StaffAdvDetails.findOne({ fid }).select("+password");
    if (user || correctPassword(req.body.password, user.password)) {
      const secret = "my-secret-string-used-in-formation-of-token";
      const expiresIn = 3 * 24 * 60 * 60;
      const token = jwt.sign({ id: user._id }, secret, {
        expiresIn,
      });

      res.cookie("jwt", token, {
        httpOnly: true,
        expiresIn: expiresIn * 1000,
      });
      console.log("done");

      res.status(201).redirect("/login/staffAdvLogin");
    }
  }
};

//change
exports.protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (!token) {
    res.redirect("/login/staffAdvisior");
  } else {
    const secret = "my-secret-string-used-in-formation-of-token";

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.redirect("/login/staffAdvisior");
      } else {
        next();
      }
    });
  }
};

exports.protectCoordinator = async (req, res, next) => {
  let token;

  token = req.cookies.Cor;

  if (!token) {
    res.redirect("/login/coordinator");
  } else {
    const secret = "my-secret-string-used-in-formation-of-token";

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.redirect("/login/coordinator");
      } else {
        next();
      }
    });
  }
};

exports.studentLoginAuth = async (req, res) => {
  const { eid, password } = req.body;
  if (!eid) {
    res.render("studentLogin");
  } else {
    const user = await studentsignin.findOne({ email: eid }).select("+psw");
    if (user || correctPassword(req.body.psw, user.psw)) {
      const secret = "my-secret-string-used-in-formation-of-token";
      const expiresIn = 3 * 24 * 60 * 60;
      // console.log(user._id);
      const token = jwt.sign({ id: user._id }, secret, {
        expiresIn,
      });

      res.cookie("stu", token, {
        httpOnly: true,
        expiresIn: expiresIn * 1000,
      });
      console.log("done");

      res.status(201).render("StudentUploadDocs");
    }
  }
};

exports.protectStudent = async (req, res, next) => {
  let token;

  token = req.cookies.stu;

  if (!token) {
    res.redirect("/login/studentlogin");
  } else {
    const secret = "my-secret-string-used-in-formation-of-token";

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.redirect("/login/studentlogin");
      } else {
        next();
      }
    });
  }
};
