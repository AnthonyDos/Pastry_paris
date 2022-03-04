const express = require('express');
const router = express.Router();

router.post('/createReservation');
router.get('/getAllReservation');
router.get('/getAllReservation/:boutique');
router.get('/getAllReservation/:date');
router.get('/getAllReservation/:ville');
router.get('/getReservation/:idReservation');
router.get('/getReservation/:numeroReservation');
router.get('/getReservation/:numeroClient');
router.get('/getReservation/:telephone');
router.get('/getReservation/:idBoutique/:date');
router.put('/putCommande/:idClient');
router.put('/putCommande/:numeroReservation');
router.delete('/deleteCommande/:idClient');
router.delete('/deleteCommande/:idReservation');
router.delete('/deleteCommande/:numeroReservation');

//gerer la route si un client ne souhaite pas avoir de compte il faut pouvoir lui sortir une facture

module.exports = router;

