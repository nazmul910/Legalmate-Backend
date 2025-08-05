import nodemailer  from "nodemailer";
import config from "../config";


const sendMail = async(to:string,html:string) =>{

  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: config.node_env == 'production', 
  auth: {
    user: config.smtp_auth_user,
    pass: config.smtp_auth_pass,
  },
});

   await transporter.sendMail({
    from:  config.smtp_auth_user,
    to,
    subject: "Change Password",
    text:"Reset your Password within 10 minutes",
    html
  });

}

export default sendMail
