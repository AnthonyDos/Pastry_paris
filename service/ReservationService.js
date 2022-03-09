//création
exports.createReservation = "INSERT INTO reservation SET dateDuJour= CURDATE(), numeroReservation= ? , id_user= ?, idBoutique= ?, horaire= ?, dateReservation= ?, nombreCouverts= ?"


//récupération
exports.getAllReservation = "SELECT * FROM reservation"

exports.getAllReservationByDate ="SELECT *, DATE_FORMAT(reservation.dateReservation, '%d/%m/%Y') FROM reservation WHERE dateReservation= ?  "

exports.getReservationById = "SELECT * FROM reservation WHERE id_reservation = ?"

exports.getReservationByNumeroReservation = "SELECT * FROM reservation WHERE numeroReservation= ?"

exports.getReservationByVille = "SELECT * FROM reservation INNER JOIN boutiques ON reservation.idBoutique = boutiques.idBoutique WHERE boutiques.ville= ?"

exports.getReservationByNumeroClient = "SELECT * FROM reservation INNER JOIN users ON reservation.id_user = users.id_user WHERE users.numero_client= ?"

exports.getReservationByTelephone = "SELECT * FROM reservation INNER JOIN users ON reservation.id_user = users.id_user WHERE users.phone= ?"

exports.getReservationByNumeroClientDateReservation = "SELECT * FROM reservation INNER JOIN users ON reservation.id_user = users.id_user WHERE users.numero_client= ? AND reservation.dateReservation= ?"

exports.getAllReservationByIdBoutique = "SELECT * FROM reservation INNER JOIN boutiques ON reservation.idBoutique = boutiques.idBoutique WHERE boutiques.idBoutique= ?"

exports.getAllReservationByIdBoutiqueDateReservation = "SELECT * FROM reservation INNER JOIN boutiques ON reservation.idBoutique = boutiques.idBoutique WHERE boutiques.idBoutique= ? AND reservation.DateReservation= ?"

//modification
exports.updateReservationByNumeroReservation = "UPDATE reservation SET dateDuJour= ?, reservation.nombreCouverts= ?, reservation.dateReservation= ?, reservation.horaire= ?, reservation.numeroReservation= ?, reservation.idBoutique= ?, reservation.id_user= ? WHERE reservation.numeroReservation= ? "

//suppression
exports.deleteReservationByIdReservation = "DELETE FROM reservation WHERE id_reservation= ?"
exports.deleteReservationByNumeroReservation = "DELETE FROM reservation WHERE numeroReservation= ?"

//DATE_FORMAT (location.dateLocation, '%d/%m/%Y') AS dateLocation

