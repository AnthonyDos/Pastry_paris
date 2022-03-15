const connection = require('../config/sql/db.config');
const reservation = require('../service/ReservationService');
const httpRequestMessages = require('../httpRequestMessages/HttpRequestMessagesReservation')

exports.getReservationByCriteres = (req, res) =>{
    const { dateReservation, id_reservation, numeroReservation, ville, numero_client, idBoutique, phone} = req.params
    if (dateReservation && numero_client === undefined && idBoutique === undefined) {  
        connection.query(reservation.getAllReservationByDate,[dateReservation],(error,result, fields)=>{
            if(error){
                res.status(400).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }else{
                res.status(201).json({ result: result, message: httpRequestMessages.successGetAllReservation})
            }
        })
    }else if(id_reservation){
        const id_reservation =req.params.id_reservation
        connection.query(reservation.getReservationById,[id_reservation],(error,result, fields)=>{
            if(result.length > 0){
                res.status(201).json({ result: result[0], message: httpRequestMessages.successGetAllReservation})
            }else{
                res.status(400).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }
        })
    }else if(numeroReservation){
        connection.query(reservation.getReservationByNumeroReservation,[numeroReservation],(error,result, fields)=>{
            if(result[0] != undefined || result < 0){
                res.status(201).json({ result: result[0], message: httpRequestMessages.successGetAllReservation})
            }else{
                res.status(400).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }
        })
    }else if(ville){
        const ville = req.params.ville
        connection.query(reservation.getReservationByVille,[ville],(error,result, fields)=>{
            if(result.length > 0){ 
                res.status(201).json({ result: result, message: httpRequestMessages.successGetAllReservation})
            }else{
                res.status(400).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }
        })
    }else if(numero_client && dateReservation === undefined){ 
        connection.query(reservation.getReservationByNumeroClient,[numero_client],(error,result, fields)=>{
            if(result.length > 0 ){
                res.status(201).json({ result: result, message: httpRequestMessages.successGetAllReservation})
            }else{
                res.status(400).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }
        })
    }else if(numero_client && dateReservation ){
        connection.query(reservation.getReservationByNumeroClientDateReservation,[numero_client, dateReservation],(error,result, fields)=>{
            if(error){
                res.status(400).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }else{
                if(result.length < 1){
                    res.status(400).json({error: error, message: httpRequestMessages.errorNoReservationClient})
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
            if(result.length > 0){
                res.status(201).json({result : result, message: httpRequestMessages.successGetAllReservation})
            }else if(result.length < 1){
                res.status(400).json({error : error , message: httpRequestMessages.errorGetAllReservationAucune})
            }else{  
                res.status(400).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }
        })    
    }else if(idBoutique && dateReservation === undefined){
        connection.query(reservation.getAllReservationByIdBoutique,[idBoutique],(error, result)=>{
            if(result){
                res.status(201).json({result: result, message: httpRequestMessages.successGetAllReservation})
            }else{
                res.status(400).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }
        })
    }else if(phone){
        connection.query(reservation.getReservationByTelephone,[phone],(error, result)=>{
            if(result){
                res.status(201).json({result: result, message: httpRequestMessages.successGetAllReservation})
            }else{
                res.status(400).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }
        })
    }else if(idBoutique && dateReservation){
        connection.query(reservation.getAllReservationByIdBoutiqueDateReservation,[idBoutique, dateReservation],(error, result)=>{
            if(result.length > 0){
                res.status(201).json({result: result, message: httpRequestMessages.successGetAllReservation})
            }else{
                res.status(400).json({error: error, message: httpRequestMessages.errorGetAllReservation})
            }
        })
    }else{
        res.status(400).json({message: httpRequestMessages.errorGetAllReservation})
    }
}

exports.createReservation = (req,res)=>{
    const {numeroReservation, id_user, idBoutique, horaire, dateReservation, nombreCouverts} = req.body
    connection.query(reservation.createReservation,[numeroReservation,id_user, idBoutique, horaire,dateReservation, nombreCouverts],(error,result)=>{
        if(error){
            res.status(400).json({error : error, message: httpRequestMessages.errorCreateReservation})
        }else{
           res.status(201).json({result: result,message: httpRequestMessages.successCreateReservation})
        }
    })
}

exports.updateReservationByCritere = (req, res) =>{
    const numeroReservation = req.params.numeroReservation
    connection.query(reservation.getReservationByNumeroReservation,[numeroReservation],(error,result, fields)=>{
        if(result){
            const { numeroReservation, idBoutique, id_user, dateDuJour} = result[0]
            const { nombreCouverts, horaire, dateReservation} = req.body
            connection.query(reservation.updateReservationByNumeroReservation,[dateDuJour,nombreCouverts, dateReservation, horaire,numeroReservation, idBoutique, id_user, numeroReservation],(error,result)=>{
                if(result){
                    res.status(201).json({result: result,message: httpRequestMessages.successUpdateReservation})  
                }else{
                    res.status(400).json({error : error, message: httpRequestMessages.errorUpdateReservation})
                }
            })
        }else{
            res.status(400).json({error: error, message: httpRequestMessages.errorGetAllReservation})
        }
    })
}

exports.deleteReservation = (req, res) =>{
    const{ id_reservation, numeroReservation} = req.params
    if(id_reservation){
        connection.query(reservation.deleteReservationByIdReservation,[id_reservation],(error,result)=>{
            if(result.affectedRows === 0){        
                res.status(400).json({error : error, message: httpRequestMessages.errorDeleteReservation})
            }else{
                res.status(201).json({ message: httpRequestMessages.successDeleteReservation})
            }
        })  
    }else if(numeroReservation){
        connection.query(reservation.deleteReservationByNumeroReservation,[numeroReservation],(error,result)=>{
            if(result.affectedRows === 0){      
                res.status(400).json({error : error, message: httpRequestMessages.errorDeleteReservation})
            }else{
                res.status(201).json({ message: httpRequestMessages.successDeleteReservation})
            }
        })  
    }else{
        res.status(400).json({error : error, message: httpRequestMessages.errorDeleteReservation})
    }
}

