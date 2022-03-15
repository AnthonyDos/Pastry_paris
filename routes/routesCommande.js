const express = require('express');
const router = express.Router();
const commande = require('../controller/CommandeController');
const auth = require('../middleware/auth');

router.post('/createCommande', auth, commande.createCommande);
router.get('/getAllCommande');
router.get('/getAllCommande/:idBoutique');
router.get('/getAllCommande/:ville/:idBoutique');
router.get('/getAllCommande/:idBoutique');
router.get('/getCommande/:idBoutique/:numeroCommande');
router.get('/getCommande/:numeroClient');
router.get('/getCommande/:numeroCommande');
router.get('/getCommande/:telephone');
router.get('/getCommande/:date'); 
router.put('/putCommande/:idCommande');
router.put('/putCommande/:numeroCommande');
router.delete('/deleteCommande/:id');

//gerer la route si un client ne souhaite pas avoir de compte il faut pouvoir lui sortir une facture
module.exports = router;