const connection = require('./../../services/connection');

module.exports = async function getPopularEvent(req, res) {
    const sql = `SELECT * FROM events ORDER BY date LIMIT 1;`;

    connection.query(sql, (err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).json("Error get data")
        }else{
            return res.status(200).json(result)
        }
    })

    
}