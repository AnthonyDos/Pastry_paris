//create message
exports.createMessage = `INSERT INTO messages 
SET nomClient= ?, prenomClient= ?, emailClient= ?, messageClient= ?, titreMessage= ?, numero_client= ?`


//get
exports.getAllMessages = `SELECT *, DATE_FORMAT(messages.dateMessage, '%d/%m/%Y') AS dateMessage FROM messages  
  ORDER BY messages.dateMessage DESC;`
exports.getMessageByIdMessage = "SELECT * FROM messages WHERE id_message= ?"
exports.getMessageByNumeroClient = "SELECT * FROM messages WHERE numero_client= ?"
exports.getMessageByEmail = "SELECT * FROM messages WHERE emailClient= ?"

//delete
exports.deleteMessageByIdMessage = "DELETE FROM messages WHERE id_message= ?"