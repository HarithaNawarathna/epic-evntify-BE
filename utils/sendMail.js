require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASS, 
  },
});

const sendMail = (to, subject, htmlTemplatePath, replacements) => {
  return new Promise((resolve, reject) => {
    fs.readFile(htmlTemplatePath, 'utf8', (err, html) => {
      if (err) {
        return reject(err);
      }

      for (let key in replacements) {
        html = html.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
      }

      const mailOptions = {
        from: `"Epic Eventify" <${process.env.GMAIL_USER}>`,
        to: to,
        subject: subject,
        html: html,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return reject(error);
        }
        resolve(info);
      });
    });
  });
};

module.exports = sendMail;
