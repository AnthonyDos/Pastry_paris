//const  getClientByCritere  = require("../controller/ClientController")

//Requêtes clients
exports.getAllClients = 'SELECT * FROM users'


//const id_user = getClientByCritere.id_user
///const numero_client = getClientByCritere.numero_client
//exports.getClientById = `SELECT * FROM users WHERE id_user= ${id_user} OR numero_client= ${numero_client}`
exports.getClientById = 'SELECT * FROM users WHERE id_user= ?'

exports.getClientByNumeroClient = 'SELECT * FROM users WHERE numero_client= ?'

exports.getClientByPhone = 'SELECT * FROM users WHERE phone= ?'

exports.getAllClientByCodePostal = 'SELECT * FROM users WHERE codePostal= ?'

//{req, passWordEncrypted, numClient}
//const test = require('../controller/ClientController.js');
// console.log(test.nom)
// console.log(test.req)
// const nom = test.req.nom
// const passwordEncrypted = test.passWordEncrypted
// const numero_client = numClient
// const clientModel = require('../model/ClientModel')
// console.log(clientModel)
exports.createClient = 'INSERT INTO users SET nom= ?, prenom= ?, email= ?, password= ?, phone= ?, adresse= ?, ville= ?, codePostal= ?, pays= ?, numero_client= ?'
