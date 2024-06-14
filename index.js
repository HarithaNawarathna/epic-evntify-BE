var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path=require('path');
const router = require('./routes/routes')

const dotenv = require('dotenv');
var connection=require('./services/connection');


var app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

const corsOptions = {
    origin: ['http://localhost:8081', 'http://localhost:19000'], // Adjust the origins as per your React Native app
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const port=3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 