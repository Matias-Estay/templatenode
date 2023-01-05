const {response} = require("express");
const nodemailer = require("nodemailer");

const EnvioEmail = async (req, res = response)=>{
    const {email,subject, name, body} = req.body
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
          user: process.env.MAIL_USERNAME, // generated ethereal user
          pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
      });
    try{
        await transporter.sendMail({
            from: process.env.MAIL_USERNAME, // sender address
            to: process.env.MAIL_USERNAME, // list of receivers
            subject: subject, // Subject line
            html: "<p>"+name+" con el correo "+email+" adjunta el siguiente mensaje:</p><br/>"+body, // html body
        });
        res.status(200).json({
            message:'OK'
        });
    }catch (error){
        res.status(500).json({
            message:'Error al envió del correo' + error
        });
    }
   
}

module.exports={
    EnvioEmail
}