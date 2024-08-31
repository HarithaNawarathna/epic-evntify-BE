const connection = require('../../services/connection');

module.exports = async function (req, res) {
    const selectOtpSql = 'SELECT * FROM haritha.otp WHERE email = ?';

    connection.query(selectOtpSql, [req.body.email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error retrieving OTP");
        } 

        if (result.length === 0) {
            return res.status(404).send("OTP not found for this email.");
        }

        const otp = result[0];
        const currentTime = new Date();

        if (new Date(otp.otp_expiry) < currentTime) {
            const deleteOtpSql = 'DELETE FROM haritha.otp WHERE email = ?';

            connection.query(deleteOtpSql, [req.body.email], (err, result) => {
                if (err) {
                    console.log(err);
                }
            });

            return res.status(408).send('OTP has expired.');
        }

        if (otp.otp === req.body.otp) {
            const deleteOtpSql = 'DELETE FROM haritha.otp WHERE email = ?';

            connection.query(deleteOtpSql, [req.body.email], (err, result) => {
                if (err) {
                    console.log(err);
                }
            });

            return res.status(200).send('OTP verification successful.');
        } else {
            return res.status(400).send('Invalid OTP.');
        }
    });
};
