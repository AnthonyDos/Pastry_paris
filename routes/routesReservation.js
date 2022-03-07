const express = require('express');
const router = express.Router();
const reservation = require('../controller/ReservationController');
const auth = require('../middleware/auth');

router.post('/createReservation', reservation.createReservation);
router.get('/getAllReservation',auth, reservation.getAllReservation );
router.get('/getAllReservation/boutique/:boutique');
router.get('/getAllReservation/date-reservation/:dateReservation', auth, reservation.getAllReservation);
            //router.get('/getAllReservation/:id_reservation', auth, reservation.getAllReservation);
router.get('/getAllReservation/ville/:ville', auth, reservation.getAllReservation);
router.get('/getReservation/idReservation/:id_reservation',auth, reservation.getAllReservation);
router.get('/getReservation/numeroReservation/:numeroReservation',auth, reservation.getAllReservation);
router.get('/getReservation/numeroClient/:numeroClient');
router.get('/getReservation/numeroclient/:numeroClient/dateReservation/:dateReservation');
router.get('/getReservation/telephone/:telephone');
router.get('/getReservation/boutique/:idBoutique/dateReservation/:dateReservation');
router.put('/putCommande/idClient/:idClient');
router.put('/putCommande/numeroReservation/:numeroReservation');
router.delete('/deleteCommande/idClient/:idClient');
router.delete('/deleteCommande/idReservation/:idReservation');
router.delete('/deleteCommande/numeroReservation/:numeroReservation');

//gerer la route si un client ne souhaite pas avoir de compte il faut pouvoir lui sortir une facture

module.exports = router;

