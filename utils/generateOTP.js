const otpGenerator = require('otp-generator');
const connection = require('./../services/connection');

const generateOTP = (email) => {
    const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });

    const otpExpiry = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes

    connection.beginTransaction(err => {
        if (err) {
            console.log('Error starting transaction:', err);
            throw new Error('Failed to start transaction');
        }

        // Delete any expired OTPs for the email
        const deleteExpiredOtpSql = 'DELETE FROM otp WHERE email = ? AND otp_expiry < NOW()';
        connection.query(deleteExpiredOtpSql, [email], (err, result) => {
            if (err) {
                console.log('Error deleting expired OTPs:', err);
                return connection.rollback(() => {
                    throw new Error('Failed to delete expired OTPs');
                });
            }

            // Insert the new OTP
            const insertOtpSql = 'INSERT INTO otp (email, otp, otp_expiry) VALUES (?, ?, ?)';
            connection.query(insertOtpSql, [email, otp, otpExpiry], (err, result) => {
                if (err) {
                    console.log('Error saving OTP:', err);
                    return connection.rollback(() => {
                        throw new Error('Failed to save OTP');
                    });
                }

                connection.commit(err => {
                    if (err) {
                        console.log('Error committing transaction:', err);
                        return connection.rollback(() => {
                            throw new Error('Failed to commit transaction');
                        });
                    }

                    console.log('OTP generated and saved successfully');
                });
            });
        });
    });

    return otp;
};

module.exports = generateOTP;
