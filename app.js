const express = require('express');
const bodyParser = require('body-parser');
//let path = require('path');
const helmet = require('helmet');
const baseUrl = require('./config/router/router')

require('dotenv').config()
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let cors = require('cors');
app.use(cors());

//routes
const clientRoutes = require('./routes/routesClient');
const reservationRoutes = require('./routes/routesReservation');
const commandeRoutes = require('./routes/routesCommande');
const boutiqueRoutes = require('./routes/routesBoutique');
const patisserieRoutes = require('./routes/routesPatisserie');
const adminRoutes = require('./routes/routesAdmin');
//en-tête
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
    next();
});

app.use(helmet())

//router
//app.use('/images', express.static(path.join(__dirname +'/images')))
app.use(baseUrl.clientUrl, clientRoutes);
app.use(baseUrl.reservationUrl, reservationRoutes);
app.use(baseUrl.commandeUrl, commandeRoutes);
app.use(baseUrl.boutiqueUrl, boutiqueRoutes);
app.use(baseUrl.patisserieUrl, patisserieRoutes);
app.use(baseUrl.adminUrl, adminRoutes);

module.exports = app; 