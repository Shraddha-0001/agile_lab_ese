const multer = require("multer");
const path = require("path");
const StudentDocumentModel = require("./../Models/studentDocModel.js");

exports.uploadDocget = (req, res) => {
  res.render("StudentUploadDocs");
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "./../public/uploads"));
  },
  filename: async (req, file, cb) => {
    let newImagepath;
    newImagepath = Date.now() + path.extname(file.originalname);
    cb(null, newImagepath);
  },
});
const upload = multer({ storage: storage }).single("upload");

exports.uploadDocpost = (req, res) => {
  upload(req, res, async (err) => {
    console.log(req.file.filename);
    const studentData = await new StudentDocumentModel({
      tname: req.body.tname,
      sports: req.body.sports,
      image: req.file.filename,
    });

    studentData.save().then((result) => {
      console.log("Document saved");
      res.redirect("/login/studentLogin/StudentUploadDocs");
    });
  });
};
