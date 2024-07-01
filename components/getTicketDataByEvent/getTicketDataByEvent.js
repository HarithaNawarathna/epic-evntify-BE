const connection = require('./../../services/connection');

module.exports = async function getTicketDataByEvent(req, res) {
    const sql = `select * from ticket_types where event_id = ${req.params.event_id}`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json("Error get data")
        } else {
            return res.status(200).json(result)
        }
    })
}