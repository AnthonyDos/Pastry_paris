//create message
exports.createMessage = "INSERT INTO messages SET nomClient= ?, prenomClient= ?, emailClient= ?, messageClient= ?, titreMessage= ?, numero_client= ?"


//get
exports.getAllMessages = "SELECT * FROM messages"
exports.getMessageByIdMessage = "SELECT * FROM messages WHERE id_message= ?"
exports.getMessageByNumeroClient = "SELECT * FROM messages WHERE numero_client= ?"
exports.getMessageByEmail = "SELECT * FROM messages WHERE emailClient= ?"

//delete
exports.deleteMessageByIdMessage = "DELETE FROM messages WHERE id_message= ?"