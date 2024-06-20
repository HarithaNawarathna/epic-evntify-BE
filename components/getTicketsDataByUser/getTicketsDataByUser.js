const connection = require('../../services/connection');

module.exports = async function getTicketsDataByUser(req, res) {
    const selectsql = `SELECT
        u.name AS user_name,
        e.event_name,
        tt.type_name AS ticket_type,
        COUNT(t.id) AS number_of_tickets
    FROM
        tickets t
        INNER JOIN users u ON t.user_id = u.id
        INNER JOIN events e ON t.event_id = e.id
        INNER JOIN ticket_types tt ON t.ticket_type_id = tt.id
    WHERE
        t.user_id = ? AND t.event_id = ?
    GROUP BY
        u.name,
        e.event_name,
        tt.type_name;`;

    try {
        connection.query(selectsql, [req.params.user_id, req.params.event_id], (err, result) => {
            if (err) {
                console.error("Error executing query:", err);
                return res.status(500).json("Internal Server Error");
            }

            return res.status(200).json(result);
        });
    } catch (err) {
        console.error("Error during getTicketsDataByUser:", err);
        return res.status(500).json("Internal Server Error");
    }
};
