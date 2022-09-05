const express = require('express');
const router = express.Router();
const patisserie = require('../controller/PatisserieController');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/createPatisserie', auth,multer, patisserie.createPatisserie); //création pâtisserie
router.get('/all-patisseries', auth,multer, patisserie.getAllPatisserie) ;
router.get('/getPatisserie/patisserie/gamme_produit/:gammeProduit', patisserie.getGammePatisserie);
router.get('/getPatisserie/patisserie/:id_patisserie', auth, multer, patisserie.getPatisserieByCritere);
//router.get('/getPatisserie/boutique/:idBoutique', auth, multer, patisserie.getPatisserieByCritere);
router.put('/putPatisserie/patisserie/:id_patisserie', auth, multer,patisserie.updatePatisserie);
router.delete('/deletePatisserie/:id_patisserie', auth, patisserie.deletePatisserie);


module.exports = router;