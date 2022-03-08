const connection = require('../config/sql/db.config');
const reservation = require('../service/ReservationService');
const httpRequestMessages = require('../httpRequestMessages/HttpRequestMessagesReservation')
const {getReservationById, getAllReservationByDate, getReservationByNumeroReservation}= require('../service/ReservationService');



exports.getReservationByCriteres = (req, res) =>{
    const dateReservation = req.params.dateReservation
    const id_reservation = req.params.id_reservation
    const numeroReservation = req.params.numeroReservation
    const ville = req.params.ville
    const numero_client = req.params.numero_client
    const idBoutique = req.params.idBoutique
    const phone = req.params.phone
    
    if (dateReservation && numero_client === undefined && idBoutique === undefined) {  
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
    }else if(numero_client && dateReservation === undefined){ 
        console.log(numero_client)
        connection.query(reservation.getReservationByNumeroClient,[numero_client],(error,result, fields)=>{
            if(result != undefined || result > 0 ){
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
    }else if(
        numero_client === undefined 
        && numero_client === undefined 
        && phone === undefined 
        && ville === undefined 
        && numeroReservation === undefined 
        && id_reservation === undefined 
        && dateReservation === undefined 
        && idBoutique === undefined
    ){
        connection.query(reservation.getAllReservation,(error, result)=>{
            if(error){
                res.status(404).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }else{
                res.status(201).json({result : result, message: httpRequestMessages.successGetAllReservation})
            }
        })    
    }else if(idBoutique && dateReservation === undefined){
        connection.query(reservation.getAllReservationByIdBoutique,[idBoutique],(error, result)=>{
            if(result){
                console.log(result)
                res.status(201).json({result: result, message: httpRequestMessages.successGetAllReservation})
            }else{
                console.log(error)
                res.status(404).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }
        })
    }else if(phone){
        connection.query(reservation.getReservationByTelephone,[phone],(error, result)=>{
            if(result){
                console.log(result)
                res.status(201).json({result: result, message: httpRequestMessages.successGetAllReservation})
            }else{
                console.log(error)
                res.status(404).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }
        })
    }else if(idBoutique && dateReservation){
        connection.query(reservation.getAllReservationByIdBoutiqueDateReservation,[idBoutique, dateReservation],(error, result)=>{
            if(result){
                console.log(result)
                res.status(201).json({result: result, message: httpRequestMessages.successGetAllReservation})
            }else{
                console.log(error)
                res.status(404).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }
        })
    }else{
        res.status(404).json({message: httpRequestMessages.errorGetAllReservation})
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