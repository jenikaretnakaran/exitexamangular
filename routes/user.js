const express= require("express");
const router=express();
const user= require("../src/model/userdata");
const otpGenerator = require('otp-generator');
const nodemailer=require("nodemailer");

router.post("/submit",(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    let newotp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    let newUser={
        emailId:req.body.emailId,
        text:req.body.text,
        otp:newotp
    }
    let userSave= new user(newUser);
    userSave.save();
    console.log(userSave);

    //mail
    var transport = nodemailer.createTransport(
        {
          service: 'gmail',
          auth: {
            user: 'ictak2022@gmail.com',
            pass: 'xxuantsnvdvlqhyo'
          }
        }
      )
    
      var mailOptions = {
    
        from: 'ictak2022@gmail.com',
        to: userSave.emailId,
        subject: 'OTP generated',
        text: `generated OTP is ${userSave.otp}`

      }
      transport.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error + " error in senting email")
        }
        else {
          console.log("email sent " + info.response)
        }
      })

      res.json(userSave.emailId);
    
})

router.get("/valid/:email",(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
  userEmail=req.params.email;
  console.log(userEmail);
  user.find({emailId:userEmail},{otp:1,_id:0}).then((data)=>{
    let result = data.map(a => a.otp);
    res.send(result);
    // console.log(result);
  });

})

module.exports=router