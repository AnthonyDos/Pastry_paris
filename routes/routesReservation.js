const express = require('express');
const router = express.Router();
const reservation = require('../controller/ReservationController');
const auth = require('../middleware/auth');

router.post('/createReservation',auth, reservation.createReservation);
router.get('/getAllReservation',auth, reservation.getReservationByCriteres );
router.get('/getAllReservation/boutique/idBoutique/:idBoutique',auth, reservation.getReservationByCriteres);
router.get('/getAllReservation/date-reservation/:dateReservation', auth, reservation.getReservationByCriteres);
router.get('/getAllReservation/ville/:ville', auth, reservation.getReservationByCriteres);
router.get('/getReservation/idReservation/:id_reservation',auth, reservation.getReservationByCriteres);
router.get('/getReservation/numeroReservation/:numeroReservation',auth, reservation.getReservationByCriteres);
router.get('/getReservation/numeroClient/:numero_client',auth, reservation.getReservationByCriteres);
router.get('/getReservation/numeroclient/:numero_client/dateReservation/:dateReservation',auth, reservation.getReservationByCriteres);
router.get('/getReservation/telephone/:phone',auth, reservation.getReservationByCriteres);
router.get('/getReservation/boutique/:idBoutique/dateReservation/:dateReservation',auth, reservation.getReservationByCriteres);
router.put('/putReservation/numeroReservation/:numeroReservation',auth, reservation.updateReservationByCritere);
router.delete('/deleteCommande/idReservation/:id_reservation',auth, reservation.deleteReservation);
router.delete('/deleteCommande/numeroReservation/:numeroReservation',auth, reservation.deleteReservation);

//gerer la route si un client ne souhaite pas avoir de compte il faut pouvoir lui sortir une facture

module.exports = router;

