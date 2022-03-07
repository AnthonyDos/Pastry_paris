exports.getAllReservation = "SELECT * FROM reservation"

exports.getAllReservationByDate ="SELECT *, DATE_FORMAT(reservation.dateReservation, '%d/%m/%Y') FROM reservation WHERE dateReservation= ?  "

exports.getReservationById = "SELECT * FROM reservation WHERE id_reservation = ?"

exports.getReservationByNumeroReservation = "SELECT * FROM reservation WHERE numeroReservation= ?"

exports.getReservationByVille = "SELECT * FROM reservation INNER JOIN boutiques ON reservation.idBoutique = boutiques.idBoutique WHERE boutiques.ville= ?"

exports.getReservationByNumeroClient = "SELECT * FROM reservation INNER JOIN users ON reservation.id_user = users.id_user WHERE users.numero_client= ?"

exports.getReservationByNumeroClientDateReservation = "SELECT * FROM reservation INNER JOIN users ON reservation.id_user = users.id_user WHERE users.numero_client= ? AND reservation.dateReservation= ?"

exports.createReservation = "INSERT INTO reservation SET numeroReservation= ? , id_user= ?, idBoutique= ?, horaire= ?, dateReservation= ?, nombreCouverts= ?"
//DATE_FORMAT (location.dateLocation, '%d/%m/%Y') AS dateLocation
