const connection = require('./../../services/connection');


module.exports = async function savePaymentData(req, res) {
    const sql = 'INSERT INTO payment (payment_id, user_id, Email, amount) VALUES (? ,? ,? ,?);';

    const values = [req.body.payment_id, req.body.user_id, req.body.Email, req.body.amount]

    connection.query(sql, values, (err,result)=>{
        if(err){
            return res.status(500).json("Error save data")
        }else{
            return res.status(200).json("success")
        }
    })
}