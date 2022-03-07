const connection = require('../config/sql/db.config');
const reservation = require('../service/ReservationService');
const httpRequestMessages = require('../httpRequestMessages/HttpRequestMessagesReservation')
const {getReservationById, getAllReservationByDate, getReservationByNumeroReservation}= require('../service/ReservationService');



exports.getAllReservation = (req, res) =>{
    const dateReservation = req.params.dateReservation
    const id_reservation = req.params.id_reservation
    const numeroReservation = req.params.numeroReservation
    const ville = req.params.ville
    const numero_client = req.params.numero_client
    if (dateReservation && numero_client === undefined && numero_client === null) {  
        connection.query(getAllReservationByDate,[dateReservation],(error,result, fields)=>{
            if(error){
                res.status(404).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }else{
                res.status(201).json({ result: result, message: httpRequestMessages.successGetAllReservation})
            }
        })
    }else if(id_reservation){
        connection.query(getReservationById,[id_reservation],(error,result, fields)=>{
            console.log(result)

            if(result[0] != undefined || result < 0){
                res.status(201).json({ result: result[0], message: httpRequestMessages.successGetAllReservation})
            }else{
                res.status(404).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }
        })
    }else if(numeroReservation){
        connection.query(getReservationByNumeroReservation,[numeroReservation],(error,result, fields)=>{
            if(result[0] != undefined || result < 0){
                res.status(201).json({ result: result[0], message: httpRequestMessages.successGetAllReservation})
            }else{
                res.status(404).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }
        })
    }else if(ville){
        connection.query(reservation.getReservationByVille,[ville],(error,result, fields)=>{
            if(result != undefined || result < 0){
                res.status(201).json({ result: result, message: httpRequestMessages.successGetAllReservation})
            }else{
                res.status(404).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }
        })
    }else if(numero_client && dateReservation === undefined && dateReservation === null){
        console.log(numero_client)
        connection.query(reservation.getReservationByNumeroClient,[numero_client],(error,result, fields)=>{
            if(result != undefined || result < 0 ){
                res.status(201).json({ result: result, message: httpRequestMessages.successGetAllReservation})
            }else{
                res.status(404).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }
        })
    }else if(numero_client && dateReservation ){
        console.log(numero_client)
        connection.query(reservation.getReservationByNumeroClientDateReservation,[numero_client, dateReservation],(error,result, fields)=>{
            if(error){
                res.status(404).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }else{
                if(result.length < 1){
                    res.status(404).json({error: error, message: httpRequestMessages.errorNoReservationClient})
                }else{
                    res.status(201).json({ result: result, message: httpRequestMessages.successGetAllReservation})
                }
            }
        })
    }else if(numero_client === null && numero_client === null && ville === null && numeroReservation === null && id_reservation === null && dateReservation === null){
        connection.query(reservation.getAllReservation,(error, result)=>{
            if(error){
                res.status(404).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }else{
                res.status(201).json({result : result, message: httpRequestMessages.successGetAllReservation})
            }
        })
    }
}

exports.createReservation = (req,res)=>{
    const numeroReservation = req.body.numeroReservation;
    const id_user = req.body.id_user;
    const idBoutique = req.body.idBoutique;
    const horaire = req.body.horaire;
    const dateReservation = req.body.dateReservation;
    const nombreCouverts = req.body.nombreCouverts;
    connection.query(reservation.createReservation,[numeroReservation,id_user, idBoutique, horaire,dateReservation, nombreCouverts],(error,result)=>{
        if(error){
            res.status(404).json({error : error, message: httpRequestMessages.errorCreateReservation})
        }else{
           res.status(201).json({result: result,message: httpRequestMessages.successCreateReservation})
        }
    })
}