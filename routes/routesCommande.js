const express = require('express');
const router = express.Router();
const commande = require('../controller/CommandeController');
const auth = require('../middleware/auth');

router.post('/createCommande', auth, commande.createCommande);
router.get('/getAllCommande');
router.get('/getAllCommande/boutique/:idBoutique');
router.get('/getAllCommande/ville/:ville/boutique/:idBoutique', auth, commande.getCommandeByCritere);
router.get('/getAllCommande/ville/:ville', auth, commande.getCommandeByCritere);
router.get('/getAllCommande/boutique/:idBoutique', auth, commande.getCommandeByCritere);
router.get('/getCommande/boutique/:idBoutique/numero_commande/:numeroCommande', auth, commande.getCommandeByCritere);
router.get('/getCommande/idCommande/:id_commande', auth, commande.getCommandeByCritere);
router.get('/getCommande/numero_client/:numeroClient');
router.get('/getCommande/numero_commande/:numeroCommande');
router.get('/getCommande/telephone/:telephone');
router.get('/getCommande/date/:date'); 
router.put('/putCommande/id_commande/:idCommande');
router.put('/putCommande/numero_commande/:numeroCommande');
router.delete('/deleteCommande/:idCommande');

//gerer la route si un client ne souhaite pas avoir de compte il faut pouvoir lui sortir une facture
module.exports = router;