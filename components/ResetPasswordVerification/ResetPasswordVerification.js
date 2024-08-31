const connection = require('../../services/connection');
const sendMail = require('./../../utils/sendMail');
const generateOTP = require('./../../utils/generateOTP');
const path = require('path');

module.exports = async function ResetPasswordVerification(req, res) {
    const selectsql = 'SELECT * FROM users WHERE email = ?;';

    try{
        connection.query(selectsql, [req.body.email], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json("Internal Server Error");
            }

            if (result.length === 0) {
                return res.status(404).json("User not found");
            }

            try{
                const otp = generateOTP(req.body.email);

                // Send email to user with OTP
                const subject = "Reset Password Verification";
                const htmlTemplatePath = path.resolve(__dirname, '../../templates/forgotpasswordotp.html');
                const replacements = {
                    name: result[0].name,
                    otp: otp
                };

                await sendMail(req.body.email, subject, htmlTemplatePath, replacements);

                return res.status(200).json("Email sent successfully");

            } catch (error) {
                console.log(error);
                return res.status(500).json("Failed to send verification email or save OTP");
            }
        });
    } catch(err){
        console.error("Error during password reset verification:", err);
        return res.status(500).json("Internal Server Error");
    }
}
