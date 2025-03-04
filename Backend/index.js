const express = require('express');
const cors = require('cors');
require('dotenv').config();
const DBConnect = require('./DB')
const shipmentRoute = require('./Routers/shipment.route')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/shipment', shipmentRoute)

app.listen(5000, () => {
    DBConnect();
    console.log("Server Running on Port 5000")});
