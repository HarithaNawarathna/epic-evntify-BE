const connection = require('./../../services/connection');
const { generateAccessToken, generateRefreshToken, hashPassword } = require('./../../utils/authUtils');
const sendMail = require('./../../utils/sendMail');
const path = require('path');

module.exports = async function userSignup(req, res) {
    const insertsql = 'INSERT INTO `haritha`.`users` (`name`, `email`, `nic`, `contact_number`, `password`) VALUES (?, ?, ?, ?, ?);';
    const selectsql = `SELECT * FROM users WHERE email = ? || nic = ?;`;

    try {
        // Check if user already exists
        connection.query(selectsql, [req.body.email, req.body.nic], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json("Internal Server Error");
            }

            if (result.length > 0) {
                return res.status(409).json("User already exists");
            }

            // If user does not exist, proceed to insert new user
            const password = await hashPassword(req.body.password);
            const values = [req.body.name, req.body.email, req.body.nic, req.body.contact_number, password];
            
            connection.query(insertsql, values, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json("Internal Server Error");
                } else {
                    // Send email to user
                    const subject = "Welcome to Epic Eventify";
                    const htmlTemplatePath = path.resolve(__dirname, '../../templates/otpSend.html');
                    const replacements = {
                        name: req.body.name,
                    };
                    sendMail(req.body.email, subject, htmlTemplatePath, replacements);

                    const accessToken = generateAccessToken(req.body.email);
                    const refreshToken = generateRefreshToken(req.body.email);
                    const username = req.body.name;

                    return res.status(201).json({
                        accessToken,
                        refreshToken,
                        username
                    });
                }
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
}
