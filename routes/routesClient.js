const express = require('express');
const router = express.Router();
const client =require('../controller/ClientController');
const auth = require('../middleware/auth');

router.post('/createClient', client.createClient); //création d'un client
router.post('/loginClient', client.connectClient); //connexion compte client
router.get('/getAllClients',auth, client.getAllClients); //tous les clients
//router.get('/getAllClients/:idBoutique/clients'); //get tous les clients par boutique
router.get('/getAllClients/:codePostal',auth, client.getAllClients); // get tous les clients par département
//router.get('/getClient/:idBoutique/:id');
router.get('/getClient/nom/:nom%',auth, client.getClientByCritere); //get client par nom 3 caractères min
router.get('/getClient/id/:id_user',auth, client.getClientByCritere); //get client par id
router.get('/getClient/numero-client/:numero_client',auth, client.getClientByCritere); // get client par numéro client
//router.get('/getClient/pointFidelite/:id_user' ,auth, client); //get point fidelite
router.get('/getClient/telephone/:phone',auth, client.getClientByCritere); // get par téléphone
router.put('/putClient/:id_user', auth, client.updateClient);//modification du client par id
//router.put('/putClient/pointFidelite/:id_user', auth, client.updatePointFidelite);//modification du point fidélité par id
router.put('/putClient/updatePassword/:id_user', auth, client.updateClientPassword);//modification du client par id
router.delete('/deleteClient/:id_user', auth, client.deleteClient); //suppression du client par id

module.exports = router;