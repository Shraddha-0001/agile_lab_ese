const {text}=require("body-parser");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const brcypt = require("bcrypt");

const studentsignin=new Schema({
    fullname:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    psw:{
        type:String,
        required:true,
        select : false
    }

});

// studentsignin.pre("save", async function (next) {
//     if (!this.psw) return next();
  
//     this.psw = await brcypt.hash(this.psw, 10);
//     next();
//   });


//   studentsignin.methods.correctPassword = async function (
//     enterPassword,
//     userPassword
//   ) {
//     return await brcypt.compare(enterPassword, userPassword);
//   };

const studentsign=mongoose.model('studentsignin',studentsignin);

module.exports=studentsign;