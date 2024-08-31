const connection = require('./../../services/connection');

module.exports = async function uploadImage(req, res) {
    const user_id = req.body.user_id;
    const img_url = req.body.img_url;

    const sql = `UPDATE users SET profile_image = ? WHERE id = ?;`;

    connection.query(sql, [img_url, user_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json("Error saving image");
        } else {
            return res.status(201).json(result);
        }
    })
}