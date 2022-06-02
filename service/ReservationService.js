//création
exports.createReservation = `INSERT INTO reservation 
SET dateDuJour= CURDATE(), numeroReservation= ? , id_user= ?, idBoutique= ?, horaire= ?, dateReservation= ?, nombreCouverts= ?`

exports.createDateResa = "INSERT INTO dateresa SET dateResa= ?, couvertsDate= ?, idBoutique= ?"

exports.getDateResa = `SELECT * 
FROM dateresa 
INNER JOIN boutiques ON dateresa.idBoutique = boutiques.idBoutique 
WHERE boutiques.idBoutique= ? AND dateResa= ?`

exports.updateDateResa = "UPDATE dateresa SET dateresa.couvertsDate= ? WHERE dateResa= ?"

//get place dispo
exports.getPlace = "SELECT placeDispo FROM reservation WHERE dateReservation= ?"
exports.updatePlace = "UPDATE reservation SET reservation.placeDispo= ? WHERE dateReservation= ? "

//récupération
exports.getAllReservation = "SELECT * FROM reservation"

exports.getAllReservationByDateAndIdBoutique =`SELECT *, DATE_FORMAT(reservation.dateReservation, '%d/%m/%Y') 
FROM reservation 
INNER JOIN boutiques ON reservation.idBoutique = boutiques.idBoutique 
WHERE dateReservation= ? AND boutiques.idBoutique = ? `

exports.getReservationById = "SELECT * FROM reservation WHERE id_reservation = ?"

exports.getReservationByNumeroReservation = "SELECT * FROM reservation WHERE numeroReservation= ?"

exports.getReservationByVille = `SELECT * 
FROM reservation 
INNER JOIN boutiques ON reservation.idBoutique = boutiques.idBoutique 
WHERE boutiques.ville= ?`

exports.getReservationByNumeroClient = `SELECT * 
FROM reservation 
INNER JOIN users ON reservation.id_user = users.id_user 
WHERE users.numero_client= ?`

exports.getReservationByTelephone = `SELECT * 
FROM reservation 
INNER JOIN users ON reservation.id_user = users.id_user
 WHERE users.phone= ?`

exports.getReservationByNumeroClientDateReservation = `SELECT * 
FROM reservation 
INNER JOIN users ON reservation.id_user = users.id_user 
WHERE users.numero_client= ? AND reservation.dateReservation= ?`

exports.getAllReservationByIdBoutique =` SELECT * 
FROM reservation 
INNER JOIN boutiques ON reservation.idBoutique = boutiques.idBoutique 
WHERE boutiques.idBoutique= ?`

exports.getAllReservationByIdBoutiqueDateReservation =` SELECT * 
FROM reservation 
INNER JOIN boutiques ON reservation.idBoutique = boutiques.idBoutique 
WHERE boutiques.idBoutique= ? AND reservation.DateReservation= ?`

//modification
exports.updateReservationByNumeroReservation = `UPDATE reservation 
SET dateDuJour= ?, reservation.nombreCouverts= ?, reservation.dateReservation= ?, reservation.horaire= ?, reservation.numeroReservation= ?, reservation.idBoutique= ?, reservation.id_user= ? 
WHERE reservation.numeroReservation= ? `

//suppression
exports.deleteReservationByIdReservation = "DELETE FROM reservation WHERE id_reservation= ?"
exports.deleteReservationByNumeroReservation = "DELETE FROM reservation WHERE numeroReservation= ?"



