const connection = require('../config/sql/db.config');
const message = require('../service/MessageService');
const httpRequestMessages = require('../httpRequestMessages/HttpRequestMessagesMessage');

exports.createMessageClient = (req, res)=>{
    const { titreMessage, messageClient, nomClient, prenomClient, emailClient, numero_client } = req.body;
    if( titreMessage === "" || messageClient === "" || emailClient === null || emailClient === ""|| nomClient === null || nomClient === "" || prenomClient === null || prenomClient === ""){
        res.status(400).json({message: httpRequestMessages.errorChampsManquant})
    }else if(titreMessage.length > 70 || messageClient.length > 1500){
        res.status(400).json({message: httpRequestMessages.errorLongueurDuChamps})
    }else{
        connection.query(message.createMessage,[nomClient,prenomClient,emailClient,messageClient,titreMessage, numero_client],(error,result)=>{
            console.log(titreMessage.length)
            if(result != undefined && result != null){
                res.status(200).json({result: result, message: httpRequestMessages.successCreateMessage})
            }else{
                res.status(400).json({error: error, message: httpRequestMessages.errorCreateMessage})
            }
        })
    }
}

exports.getAllMessages = (req, res)=>{
    connection.query(message.getAllMessages,(error,results)=>{
        if(results.length > 0){
            res.status(200).json({results: results, message: httpRequestMessages.successGetAllMessages})
        }else{
            res.status(400).json({error: error, message: httpRequestMessages.errorGetAllMessages})
        }
    })
}

exports.getMessageByCritere = (req, res)=>{
    const id_message = req.params.id_message
    const numero_client = req.params.numero_client
    const emailClient = req.params.emailClient
    if (id_message) {
        connection.query(message.getMessageByIdMessage,[id_message],(error,result)=>{
            if(result[0] != undefined){
                res.status(200).json({result: result, message: httpRequestMessages.successGetMessageByCritere})
            }else{
                res.status(400).json({error: error, message: httpRequestMessages.errorGetMessageByCritere})
            }
        })
    }else if(numero_client){
        connection.query(message.getMessageByNumeroClient,[numero_client],(error,result)=>{
            console.log(result)
            if(result[0] != undefined){
                res.status(200).json({result: result, message: httpRequestMessages.successGetMessageByCritere})
            }else{
                res.status(400).json({error: error, message: httpRequestMessages.errorGetMessageByCritere})
            }
        })
    }else if(emailClient){
        connection.query(message.getMessageByEmail,[emailClient],(error,result)=>{
            console.log(result)
            if(result[0] != undefined){
                res.status(200).json({result: result, message: httpRequestMessages.successGetMessageByCritere})
            }else{
                res.status(400).json({error: error, message: httpRequestMessages.errorGetMessageByCritere})
            }
        })
    }else{
        res.status(400).json({message: httpRequestMessages.errorGetMessage})
    }
}

exports.deleteMessageByIdMessage = (req, res)=>{
    const id_message = req.params.id_message
    connection.query(message.deleteMessageByIdMessage,[id_message],(error,result)=>{
        if(result.affectedRows != 0){
            res.status(200).json({message: httpRequestMessages.successDeleteMessage})
        }else{
            res.status(400).json({error: error, message: httpRequestMessages.errorDeleteMessage})
        }
    })
}