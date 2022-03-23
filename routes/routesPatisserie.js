const express = require('express');
const router = express.Router();
const patisserie = require('../controller/PatisserieController');
const auth = require('../middleware/auth');

router.post('/createPatisserie', auth, patisserie.createPatisserie); //création pâtisserie
router.get('/all-patisseries', auth, patisserie.getAllPatisserie) ;
router.get('/getPatisserie/patisserie/:id_patisserie', auth, patisserie.getPatisserieByCritere);
router.get('/getPatisserie/boutique/:idBoutique', auth, patisserie.getPatisserieByCritere);
router.put('/putPatisserie/patisserie/:id_patisserie', auth, patisserie.updatePatisserie);
router.delete('/deletePatisserie/:id_patisserie', auth, patisserie.deletePatisserie);


module.exports = router;