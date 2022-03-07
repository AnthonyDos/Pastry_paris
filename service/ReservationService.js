exports.getAllReservation = "SELECT * FROM reservation"

exports.getAllReservationByDate = "SELECT * FROM reservation WHERE dateReservation= ?"

exports.getAllReservationById = "SELECT * FROM reservation WHERE id_reservation= ?"

 //exports.getAllReservationByDate = "SELECT DATE(dateReservation, '%d/%m/%Y') AS reservation WHERE dateReservation= ?"

// exports.getAllReservationByDate = "SELECT *, DATE(dateReservation, '%d/%m/%Y') FROM reservation WHERE horaire = ?"

//exports.getAllReservationByDate = "SELECT * FROM reservation WHERE id_reservation = ?"

//exports.createReservation = "INSERT INTO reservation SET numeroReservation= ? , id_user= ?, idBoutique= ?, horaire= ?, dateReservation= ?, nombreCouverts= ?"

exports.createReservation = "INSERT INTO reservation SET numeroReservation= ? , id_user= ?, idBoutique= ?, horaire= ?, DATE_FORMAT(dateReservation, '%d/%m/%Y') = ?, nombreCouverts= ?"
//DATE_FORMAT (location.dateLocation, '%d/%m/%Y') AS dateLocation