const connection = require('./../../services/connection');
const { comparePassword, hashPassword } = require('./../../utils/authUtils');

module.exports = async function changePassword(req, res) {
    const { userId, currentPassword, newPassword, confirmPassword } = req.body;
    const selectsql = 'SELECT * FROM users WHERE id = ?;';
    const updatePasswordSql = 'UPDATE users SET password = ? WHERE id = ?;';

    if (newPassword !== confirmPassword) {
        return res.status(400).json("New passwords do not match");
    }

    try {
        connection.query(selectsql, [userId], async (err, result) => {
            if (err) {
                console.error("Error retrieving user from database:", err);
                return res.status(500).json("Internal Server Error");
            }

            if (result.length === 0) {
                return res.status(404).json("User not found");
            }

            const user = result[0];
           

            const match = await comparePassword(currentPassword, user.password);
            if (!match) {
                return res.status(401).json("Invalid current password");
            }

            const hashedPassword = await hashPassword(newPassword);

            connection.query(updatePasswordSql , [hashedPassword, userId], (err, result) => {
                if (err) {
                    console.error("Error updating password in database:", err);
                    return res.status(500).json("Internal Server Error");
                }

                return res.status(200).json("Password updated successfully");
            });
        });
    } catch (err) {
        console.error("Error during password change:", err);
        return res.status(500).json("Internal Server Error");
    }
};
