const connection = require('./../../services/connection');


module.exports = async function getEventData(req, res) {
    const sql = `SELECT id, event_name, about,location, DATE_FORMAT(date, '%Y %b %d') AS date, TIME_FORMAT(time, '%h:%i %p') AS time, image_url FROM events WHERE id = ?;`;

    connection.query(sql, req.params.id, (err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).json("Error get event data")
        }else{
            return res.status(200).json(result)
        }
    })

    
}