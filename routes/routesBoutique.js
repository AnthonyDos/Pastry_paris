const express = require('express');
const router = express.Router();
const boutique = require('../controller/BoutiqueController');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/createBoutique', auth,  multer, boutique.createBoutique ); // création boutique
router.get('/getBoutique/all-boutiques', auth, boutique.getAllBoutiques); //get all boutiques
router.get('/getBoutique/boutique/:idBoutique', auth, boutique.getBoutiqueByCriteres); //get boutiques par id
router.get('/getBoutique/boutique/ville/:ville', auth, boutique.getBoutiqueByCriteres); //get all boutiques par ville
router.get('/getBoutique/boutique/pays/:pays', auth, boutique.getBoutiqueByCriteres); //get all boutiques par pays
router.put('/putBoutique/boutique/:idBoutique', auth, boutique.updateBoutique);//modification de la boutique par id
router.delete('/deleteBoutique/boutique/:idBoutique', auth, boutique.deleteBoutiqueById);//suppression par id

module.exports = router;