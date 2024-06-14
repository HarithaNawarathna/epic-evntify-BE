const connection = require('./../../services/connection');

module.exports = async function getEventData(req, res) {
    const sql = `SELECT id,event_name, DATE_FORMAT(date, '%Y %b %d') AS date, TIME_FORMAT(time, '%h:%i %p') AS time, image_url FROM events;`;

    connection.query(sql, (err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).json("Error save data")
        }else{
            return res.status(200).json(result)
        }
    })

    
}