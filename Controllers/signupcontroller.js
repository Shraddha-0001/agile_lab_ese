const studentsign=require("../Models/studentsignin");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.studentsignin = (req, res) => {
    res.render("studentsignin");
  };
  
  
exports.storeStudentDetails= async (req,res)=>{
  console.log(req.body);
  let={fullname, email, psw, cpassword}=req.body;
  const exist = await studentsign.findOne({ email });
  if (!exist) {
    
    if (psw != cpassword) {
      const msg = "Password and confirm password should be same";
      
      res.render("studentsignin", { msg });
      
    }
    else{
      
      let hashPassward = await bcrypt.hash(psw, 10);
     
      const studentDtails= await studentsign.create({
      
        fullname: fullname,
        email: email,
        psw: hashPassward
        
      }).then((result)=>{
        console.log("Data saved");
        const secret = "my-secret-string-used-in-formation-of-token";
        const expiresIn = "90d";
        const token = jwt.sign({ id: result._id }, secret, {
          expiresIn,
        });

      res
      .status(201)
      .render("studenDashboard");
      });
      console.log(studentDtails);
    }
  } 
  else{
    const msg = "User alredy exist";
    res.render("studentsignin", { msg });
  }
};