const express = require('express');
const router = express.Router();
const client =require('../controller/ClientController')

router.post('/createClient', client.createClient); //création d'un client
router.get('/getAllClients', client.getAllClients); //tous les clients
//router.get('/getAllClients/:idBoutique/clients'); //get tous les clients par boutique
router.get('/getAllClients/:codePostal', client.getAllClients); // get tous les clients par département
//router.get('/getClient/:idBoutique/:id');
router.get('/getClient/id/:id_user', client.getClientByCritere); //get client par id
router.get('/getClient/numero-client/:numero_client',client.getClientByCritere); // get client par numéro client
//router.get('/getClient/:idBoutique/:numeroClient' ); //get par numéro de client
router.get('/getClient/telephone/:phone', client.getClientByCritere); // get par téléphone
router.put('/putClient/:id');//modification du client par id
router.delete('/deleteClient/:id'); //suppression du client par id

module.exports = router;