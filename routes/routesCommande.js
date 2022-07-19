const express = require('express');
const router = express.Router();
const commande = require('../controller/CommandeController');
const auth = require('../middleware/auth');

router.post('/createCommande', auth, commande.createCommande);
router.get('/getAllCommande', auth, commande.getCommandByAllCommande);
router.get('/getAllCommande/ville/:ville/boutique/:idBoutique', auth, commande.getCommandByVilleAndIdBoutique);
router.get('/getAllCommande/ville/:ville', auth, commande.getCommandByVille);
router.get('/getAllCommande/boutique/:idBoutique', auth, commande.getCommandByIdBoutique);
router.get('/getCommande/boutique/:idBoutique/numero_commande/:numeroCommande', auth, commande.getCommandByIdBoutiqueAndNumeroCommand);
router.get('/getCommande/idCommande/:id_commande', auth, commande.getCommandByIdCommand);
router.get('/getCommande/id_client/:id_user', auth, commande.getCommandByIdClient);
router.get('/getCommande/numero_commande/:numeroCommande', auth, commande.getCommandByNumeroCommande);
router.get('/getCommande/telephone/:phone', auth, commande.getCommandByPhone);
router.get('/getCommande/date/:dateCommande', auth, commande.getCommandByDateCommande); 
router.put('/putCommande/id_commande/:id_commande', auth, commande.updateCommandeByCritere);
router.put('/putCommande/numero_commande/:numeroCommande', auth, commande.updateCommandeByCritere);
router.delete('/deleteCommande/:id_commande',auth, commande.deleteCommandeById);


//gerer la route si un client ne souhaite pas avoir de compte il faut pouvoir lui sortir une facture
module.exports = router;