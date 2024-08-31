const connection = require('../../services/connection');

module.exports = async function editProfile(req, res) {

 values = [req.body.name, req.body.email, req.body.nic, req.body.contact_number, parseInt(req.body.user_id)]

    const sql = 'UPDATE haritha.users SET name = ?, email = ?, nic = ?, contact_number = ? WHERE id = ?;';
    
    connection.query(sql, [req.body.name, req.body.email, req.body.nic, req.body.contact_number, req.body.user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error updating user data');
        }

        return res.status(200).send(result);
    });
}
