const express = require('express');
const router = express.Router();

router.post('/createBoutique'); // création boutique
router.get('/getBoutique/all-boutiques'); //get all boutiques
router.get('/getBoutique/:ville/:idBoutique'); //get all boutiques par ville
router.get('/getBoutique/:codePostal/:idBoutique');//get all boutiques par code postal
router.get('/getBoutique/:pays/:idBoutique'); //get all boutiques par pays
router.get('/getBoutique/:idBoutique/AllClient'); //get all client de la boutiques 
router.get('/getBoutique/:idBoutique/:id_client'); //get client by id d'une boutiques 
router.put('/putBoutique/:idBoutique');//modification de la boutique par id
router.delete('/deleteBoutique/:idBoutique');//suppression par id