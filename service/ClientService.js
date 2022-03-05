

//Requêtes clients
exports.getAllClients = 'SELECT * FROM users'


//const id_user = getClientByCritere.id_user
///const numero_client = getClientByCritere.numero_client
//exports.getClientById = `SELECT * FROM users WHERE id_user= ${id_user} OR numero_client= ${numero_client}`

exports.getClientById = 'SELECT * FROM users WHERE id_user= ?'

//exports.getClientById = 'SELECT users.password FROM users WHERE id_user= ?'

exports.getClientByNumeroClient = 'SELECT * FROM users WHERE numero_client= ?'

exports.getClientByPhone = 'SELECT * FROM users WHERE phone= ?'

exports.getClientByEmail = 'SELECT * FROM users WHERE  email = ?'

//exports.getClientByNom = "SELECT * FROM users WHERE  nom LIKE '%' "

exports.getAllClientByCodePostal = 'SELECT * FROM users WHERE codePostal= ?'

exports.createClient = 'INSERT INTO users SET nom= ?, prenom= ?, email= ?, password= ?, phone= ?, adresse= ?, ville= ?, codePostal= ?, pays= ?, numero_client= ?'

exports.connectClient = 'SELECT * FROM users WHERE email = ? '

exports.updateClient = 'UPDATE users SET nom= ?, prenom= ?, email= ?, password= ?, phone= ?, adresse= ?, ville= ?, codePostal= ?, pays= ?, numero_client= ? WHERE id_user= ?'


