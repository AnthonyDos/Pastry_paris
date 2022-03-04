const express = require('express');
const router = express.Router();

router.post('/createPatisserie'); //création pâtisserie
router.get('/all-patisseries') ;//all pâtisseries
router.get('/getPatisserie/:id');
router.get('/getPatisserie/:ville');
router.get('/getPatisserie/:codePostal');
router.put('/putPatisserie/:id');
router.delete('deletePatisserie/:id');


module.exports = router;