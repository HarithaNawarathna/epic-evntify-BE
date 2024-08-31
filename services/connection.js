const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: 'localhost', //epiceventify.mysql.database.azure.com
    user: 'root', //epiceventify
    password: 'root', //MAHhrn211@
    database: 'haritha', //epiceventifydb
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
        return;
    }
    console.log('Connected to database');
});

connection.on('error', (err) => {
    console.error('Database error:', err.message);
});

module.exports = connection;
