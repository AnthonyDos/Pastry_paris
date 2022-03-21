const express = require('express');
const router = express.Router();
const commande = require('../controller/CommandeController');
const auth = require('../middleware/auth');

router.post('/createCommande', auth, commande.createCommande);
router.get('/getAllCommande', auth, commande.getCommandeByCritere);
router.get('/getAllCommande/ville/:ville/boutique/:idBoutique', auth, commande.getCommandeByCritere);
router.get('/getAllCommande/ville/:ville', auth, commande.getCommandeByCritere);
router.get('/getAllCommande/boutique/:idBoutique', auth, commande.getCommandeByCritere);
router.get('/getCommande/boutique/:idBoutique/numero_commande/:numeroCommande', auth, commande.getCommandeByCritere);
router.get('/getCommande/idCommande/:id_commande', auth, commande.getCommandeByCritere);
router.get('/getCommande/numero_client/:numero_client', auth, commande.getCommandeByCritere);
router.get('/getCommande/numero_commande/:numeroCommande', auth, commande.getCommandeByCritere);
router.get('/getCommande/telephone/:phone', auth, commande.getCommandeByCritere);
router.get('/getCommande/date/:dateCommande', auth, commande.getCommandeByCritere); 
router.put('/putCommande/id_commande/:id_commande', auth, commande.updateCommandeByCritere);
router.put('/putCommande/numero_commande/:numeroCommande', auth, commande.updateCommandeByCritere);
router.delete('/deleteCommande/:id_commande');

//gerer la route si un client ne souhaite pas avoir de compte il faut pouvoir lui sortir une facture
module.exports = router;