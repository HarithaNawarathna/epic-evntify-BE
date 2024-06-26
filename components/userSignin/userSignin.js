const connection = require('./../../services/connection');
const { comparePassword, generateAccessToken, generateRefreshToken } = require('./../../utils/authUtils');

module.exports = async function userSignin(req, res) {
    const sql = `SELECT * FROM users WHERE email = ?;`;

    try {
        connection.query(sql, [req.body.email], async (err, result) => {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json("Internal Server Error");
            }

            if (result.length === 0) {
                return res.status(404).json("User not found");
            }

            const user = result[0];
            const match = await comparePassword(req.body.password, user.password);
            if (!match) {
                return res.status(401).json("Invalid Password");
            }

            const accessToken = generateAccessToken(user.email);
            const refreshToken = generateRefreshToken(user.email);
            const username = user.name;
            const user_id = user.id
            return res.status(200).json({
                accessToken,
                refreshToken,
                username,
                user_id
            });

            

            
        });
    } catch (err) {
        console.error("Error during signin:", err);
        return res.status(500).json("Internal Server Error");
    }
};
