const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config()



const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendemail(email, resetLink) {
  const mailSent = await transporter.sendMail({
    from: process.env.user, // Sender's email address
    to: email, // Recipient's email address
    subject: 'Password Reset', // Email subject
    html: `
      <html>
      <body>
        <p>Hello,</p>
        <p>You have requested to reset your password. Please click the link below to proceed:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>If you did not request this password reset, you can ignore this email.</p>
      </body>
      </html>
      `
 });
}

module.exports = sendemail;