const connection = require('../../services/connection')
const { hashPassword } = require('./../../utils/authUtils');



module.exports = async function resetPassword(req, res){
    const email = req.body.email
    const password = req.body.newPassword
    const hashedPassword = await hashPassword(password)

    const sql = `UPDATE haritha.users SET password = ? WHERE (email = ?);`

    connection.query(sql, [hashedPassword, email], (err, result)=>{
        if(err){
            return res.status(500).send('Internal Server Error')
        }else{
            return res.status(200).send('Password Updated')
        }
    })
}