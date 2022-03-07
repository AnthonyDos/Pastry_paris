exports.getAllReservation = "SELECT * FROM reservation"

exports.getAllReservationByDate ="SELECT *, DATE_FORMAT(reservation.dateReservation, '%d/%m/%Y') FROM reservation WHERE dateReservation= ?  "

exports.getReservationById = "SELECT * FROM reservation WHERE id_reservation = ?"

exports.getReservationByNumeroReservation = "SELECT * FROM reservation WHERE numeroReservation= ?"

exports.getReservationByVille = "SELECT * FROM reservation INNER JOIN boutiques ON reservation.idBoutique = boutiques.idBoutique WHERE boutiques.ville= ?"

exports.createReservation = "INSERT INTO reservation SET numeroReservation= ? , id_user= ?, idBoutique= ?, horaire= ?, dateReservation= ?, nombreCouverts= ?"
//DATE_FORMAT (location.dateLocation, '%d/%m/%Y') AS dateLocation
