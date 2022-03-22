const express = require('express');
const router = express.Router();
const boutique = require('../controller/BoutiqueController');
const auth = require('../middleware/auth');

router.post('/createBoutique', auth, boutique.createBoutique ); // création boutique
router.get('/getBoutique/all-boutiques', auth, boutique.getAllBoutiques); //get all boutiques
router.get('/getBoutique/boutique/:idBoutique', auth, boutique.getBoutiqueByCriteres); //get boutiques par id
router.get('/getBoutique/boutique/ville/:ville', auth, boutique.getBoutiqueByCriteres); //get all boutiques par ville
router.get('/getBoutique/boutique/pays/:pays', auth, boutique.getBoutiqueByCriteres); //get all boutiques par pays
router.get('/getBoutique/boutique/allReservation/:idBoutique'); // get All reservation de la boutique
router.get('/getBoutique/boutique/allPatisseries/:idBoutique'); //get All pâtisseries de la boutique
router.put('/putBoutique/:idBoutique');//modification de la boutique par id
router.delete('/deleteBoutique/:idBoutique');//suppression par id

module.exports = router;