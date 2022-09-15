//Requêtes clients
exports.getAllClients = "SELECT * FROM users";

exports.getClientById = "SELECT * FROM users WHERE id_user= ?";

exports.getClientPointFideliteCommande = `SELECT users.pointFidelite,users.numero_passage,users.statusFidelite,commandes.pointReservation, commandes.numeroPassage 
FROM users 
INNER JOIN commandes ON users.id_user = commandes.id_user  
WHERE users.id_user= ?`;

exports.getClientPointFideliteReservation = `SELECT users.pointFidelite,users.numero_passage,users.statusFidelite,reservation.pointReservation, reservation.numeroPassage 
FROM users 
INNER JOIN reservation ON users.id_user = reservation.id_user  
WHERE users.id_user= ?`;

exports.getClientByNumeroClient = "SELECT * FROM users WHERE numero_client= ?";

exports.getClientByPhone = "SELECT * FROM users WHERE phone= ?";

exports.getClientByEmail = "SELECT * FROM users WHERE  email = ?";

exports.getClientByName = "SELECT * FROM users WHERE nom= ? ";

//create client
exports.createClient = `INSERT INTO users 
SET isAdmin= 0,civilite= ?, nom= ?, prenom= ?, email= ?, password= ?, phone= ?, adresse= ?, ville= ?, codePostal= ?, pays= ?, numero_client= ?`;

exports.connectClient = "SELECT * FROM users WHERE email = ? ";

exports.updateClient = ` UPDATE users 
SET nom= ?, prenom= ?, email= ?, password= ?, phone= ?, adresse= ?, ville= ?, codePostal= ?, pays= ?
WHERE id_user= ?`;

exports.deleteClient = "DELETE FROM users WHERE id_user= ?";

exports.UpdatePassword = "UPDATE users SET password= ? WHERE id_user= ?";

exports.UpdatePointFidelite =
  "UPDATE users SET pointFidelite= ?, numero_passage= ?,statusFidelite= ? WHERE id_user= ?";

exports.updateNumeroClient =
  "UPDATE users SET numero_client= ? WHERE id_user= ?";
