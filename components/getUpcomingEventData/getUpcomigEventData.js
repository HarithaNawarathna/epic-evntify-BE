const connection = require('./../../services/connection');

module.exports = async function getUpcomingEventData(req, res) {
    const sql = `SELECT id, image_url FROM events WHERE date BETWEEN CURDATE() + INTERVAL 1 MONTH AND CURDATE() + INTERVAL 12 MONTH;`;

    connection.query(sql, (err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).json("Error save data")
        }else{
            return res.status(200).json(result)
        }
    })

    
}