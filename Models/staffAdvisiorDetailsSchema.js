const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const brcypt = require("bcrypt");

const staffAdvisiorSchema = new Schema(
  {
    fid: {
      type: Number,
      required: true,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      //change by dipankar
      select: false,
    },
    position: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

staffAdvisiorSchema.pre("save", async function (next) {
  if (!this.password) return next();

  this.password = await brcypt.hash(this.password, 10);
  next();
});

staffAdvisiorSchema.methods.correctPassword = async function (
  enterPassword,
  userPassword
) {
  return await brcypt.compare(enterPassword, userPassword);
};
const StaffDetails = mongoose.model("StaffAdvDetails", staffAdvisiorSchema);

module.exports = StaffDetails;
