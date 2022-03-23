//Requêtes clients
exports.getAllClients = 'SELECT * FROM users'

exports.getClientById = 'SELECT * FROM users WHERE id_user= ?'

//exports.getClientById = 'SELECT users.password FROM users WHERE id_user= ?'

exports.getClientByNumeroClient = 'SELECT * FROM users WHERE numero_client= ?'

exports.getClientByPhone = 'SELECT * FROM users WHERE phone= ?'

exports.getClientByEmail = 'SELECT * FROM users WHERE  email = ?'

exports.getAllClientByCodePostal = 'SELECT * FROM users WHERE codePostal= ?'


//create client
exports.createClient = 'INSERT INTO users SET nom= ?, prenom= ?, email= ?, password= ?, phone= ?, adresse= ?, ville= ?, codePostal= ?, pays= ?, numero_client= ?'

exports.connectClient = 'SELECT * FROM users WHERE email = ? '

exports.updateClient = 'UPDATE users SET nom= ?, prenom= ?, email= ?, password= ?, phone= ?, adresse= ?, ville= ?, codePostal= ?, pays= ?, numero_client= ? WHERE id_user= ?'

exports.deleteClient = "DELETE FROM users WHERE id_user= ?"

exports.UpdatePassword = "UPDATE users SET password= ? WHERE id_user= ?"
