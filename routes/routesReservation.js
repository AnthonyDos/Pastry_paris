const express = require('express');
const router = express.Router();
const reservation = require('../controller/ReservationController');
const auth = require('../middleware/auth');

router.post('/createReservation', reservation.createReservation);
router.get('/getAllReservation',auth, reservation.getAllReservation );
router.get('/getAllReservation/:boutique');
router.get('/getAllReservation/date-reservation/:dateReservation', auth, reservation.getAllReservation);
            //router.get('/getAllReservation/:id_reservation', auth, reservation.getAllReservation);
router.get('/getAllReservation/:ville');
router.get('/getReservation/:id_reservation',auth, reservation.getAllReservation);
router.get('/getReservation/:numeroReservation');
router.get('/getReservation/:numeroClient');
router.get('/getReservation/:numeroClient/:dateReservation');
router.get('/getReservation/:telephone');
router.get('/getReservation/:idBoutique/:dateReservation');
router.put('/putCommande/:idClient');
router.put('/putCommande/:numeroReservation');
router.delete('/deleteCommande/:idClient');
router.delete('/deleteCommande/:idReservation');
router.delete('/deleteCommande/:numeroReservation');

//gerer la route si un client ne souhaite pas avoir de compte il faut pouvoir lui sortir une facture

module.exports = router;

