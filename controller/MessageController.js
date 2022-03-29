const connection = require('../config/sql/db.config');
const message = require('../service/MessageService');
const httpRequestMessages = require('../httpRequestMessages/HttpRequestMessagesMessage');

exports.createMessageClient = (req, res)=>{
    const { titreMessage, messageClient, nomClient, prenomClient, emailClient } = req.body;
    if(titreMessage.length > 250 || titreMessage === ""  || messageClient.length > 1500 || messageClient === "" || emailClient === null || emailClient === ""|| nomClient === null || nomClient === "" || prenomClient === null || prenomClient === ""){
        res.status(400).json({message: "mot trop long"})
    }else{
        connection.query(message.createMessage,[nomClient,prenomClient,emailClient,messageClient,titreMessage],(error,result)=>{
            console.log(titreMessage.length)
            if(result != undefined && result != null){
                res.status(200).json({result: result, message: httpRequestMessages.successCreateMessage})
            }else{
                res.status(400).json({error: error, message: httpRequestMessages.errorCreateMessage})
            }
        })
    }
}