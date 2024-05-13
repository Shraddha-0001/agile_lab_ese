const StaffAdvDetails = require("./../Models/staffAdvisiorDetailsSchema");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//change
const jwt = require("jsonwebtoken");

exports.coordinatorHome = (req, res) => {
  res.render("coordinatorHome");
};

exports.staffAdvisiorDetails = (req, res) => {
  res.render("staffAdvisiorDetails");
};

exports.storeStaffAdvisiorDetails = async (req, res) => {
  let { fid, fname, lname, password, confirmpassword, position } = req.body;
  const exist = await StaffAdvDetails.findOne({ fid });
  if (!exist) {
    if (password != confirmpassword) {
      const msg = "Password and confirm password should be same";
      res.render("staffAdvisiorDetails", { msg });
    } else {
      //console.log(password);
      let hashPassward = await bcrypt.hash(password, 10);

      const staffDetail = await StaffAdvDetails.create({
        fid: fid,
        fname: fname,
        lname: lname,
        password: hashPassward,
        position: position,
      }).then((result) => {
        console.log("Data saved");
        const secret = "my-secret-string-used-in-formation-of-token";
        const expiresIn = "90d";
        const token = jwt.sign({ id: result._id }, secret, {
          expiresIn,
        });

        res
          .status(201)
          .redirect("/login/coordinatorLogin/staffAdvisiorDetails");
      });

      //changes
      console.log(staffDetail);
    }
  } else {
    const msg = "Faculty ID already exist";
    res.render("staffAdvisiorDetails", { msg });
  }
};

exports.notifyAll = (req, res) => {
  res.render("NotifyAll");
};

exports.sendNotification = (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shradhakore274@gmail.com",
      pass: "lvlghipnquqopdtj",
    },
  });
  transporter.sendMail(
    {
      from: "shradhakore274@gmail.com",
      to: "ddubey10032002@gmail.com",
      subject: "Notification",
      text: req.body.subject,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      }
    }
  );
};
