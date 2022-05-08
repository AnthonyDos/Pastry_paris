const connection = require('../config/sql/db.config');
const reservation = require('../service/ReservationService');
const httpRequestMessages = require('../httpRequestMessages/HttpRequestMessagesReservation');
const HttpRequestMessagesUser = require('../httpRequestMessages/HttpRequestMessagesUser');
const client = require('../service/ClientService');

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


exports.createReservation = (req, res) => {
    const date = new Date();
    const day = date.getDate()
    if (day < 10) {
        var days = '0' + day
    } else {
        days = day
    }
    const mois = (date.getMonth() + 1)
    if (mois < 10) {
        var moi = '0' + mois
    } else {
        moi = mois
    }
    const concatDate = date.getFullYear() + '-' + moi + '-' + days
    console.log(concatDate)
    const { numeroReservation, id_user, idBoutique, horaire, dateReservation, nombreCouverts } = req.body;
    const FunctionUpdatePointFidelite = () => {
        connection.query(client.getClientPointFideliteReservation, [id_user], (error, results) => {
            const { pointFidelite, pointReservation, numero_passage, numeroPassage } = results[0]
            if (pointFidelite + pointReservation > 9 && pointFidelite < 49) {
                statusFidelite = "argent"
            }
            if (pointFidelite + pointReservation > 49) {
                statusFidelite = "Or"
            }
            if (pointFidelite + pointReservation < 9) {
                statusFidelite = "bronze"
            }
            if (error) {
                res.status(400).json({ error: error, message: HttpRequestMessagesUser.errorGetClientById })
            } else {
                connection.query(client.UpdatePointFidelite, [pointFidelite + pointReservation, numero_passage + numeroPassage, statusFidelite, id_user], (error, result) => {
                    if (error) {
                        res.status(400).json({ error: error, message: HttpRequestMessagesUser.errorUpdatePointFidelite })
                    } else {
                        res.status(200).json
                    }
                })
            }
        })
    }
    connection.query(reservation.getAllReservationByIdBoutiqueDateReservation, [idBoutique, dateReservation], (error, results) => {
        if (results.length < 1) {
            if (error) {
                res.status(400).json({ error: error, message: httpRequestMessages.errorCreateReservation })
            } else {
                connection.query(reservation.createReservation, [numeroReservation, id_user, idBoutique, horaire, dateReservation, nombreCouverts], (error, result) => {
                    if (error) {
                        res.status(400).json({ error: error, message: httpRequestMessages.errorCreateReservation })
                    } else {
                        connection.query(reservation.createDateResa, [dateReservation, nombreCouverts, idBoutique], (error, result) => {
                            if (error) {
                                res.status(400).json({ error: error })
                            } else {
                                res.status(200).json
                            }
                        })
                        FunctionUpdatePointFidelite()
                        res.status(201).json({ result: result, message: httpRequestMessages.successCreateReservation })
                    }
                })
            }
        } else {
            connection.query(reservation.getDateResa, [idBoutique, dateReservation], (error, results) => {
                const totalCouvertsBdd = results[0].couvertsDate
                console.log(totalCouvertsBdd + "test pour voir")
                const totalDispoAndCouvertsEnCours = totalCouvertsBdd + parseInt(nombreCouverts)
                if (totalCouvertsBdd >= 20 || totalDispoAndCouvertsEnCours >= 20) {
                    res.status(400).json({ error: error, message: "il n y a plus de place disponible pour le jour" })
                } else {
                    FunctionUpdatePointFidelite()
                    connection.query(reservation.createReservation, [numeroReservation, id_user, idBoutique, horaire, dateReservation, nombreCouverts], (error, result) => {
                        if (error) {
                            res.status(400).json({ error: error, message: httpRequestMessages.errorCreateReservation })
                        } else {
                            const totalCouvertsBddAndResaEnCours = totalCouvertsBdd + parseInt(nombreCouverts)
                            connection.query(reservation.updateDateResa, [totalCouvertsBddAndResaEnCours, dateReservation], (error, result) => {
                                if (error) {
                                    res.status(400).json({ error: error })
                                } else {
                                    res.status(200).json
                                }
                            })
                            res.status(201).json({ result: result, message: httpRequestMessages.successCreateReservation })
                        }
                    })
                }
            })
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

exports.CancelReservationById = (req,res)=>{
    const id_reservation = req.params.id_reservation
    const currentTime = new Date();
    const timeMinutes = currentTime.getMinutes()
    if(timeMinutes < 10){
        var timeMinute = '0' + timeMinutes
    }else{
        timeMinute = timeMinutes
    }
      
    const heureCommande = currentTime.getHours() + ":" + timeMinute
    console.log(heureCommande)

    connection.query(reservation.getReservationById,[id_reservation],(error,result, fields)=>{
        if(result.length > 0){
            console.log(result[0].horaire)
            const testHeure = result[0].horaire
            console.log(testHeure)
            const horaireDemandeAnnulation = heureCommande - testHeure
            console.log(horaireDemandeAnnulation)
            connection.query(reservation.deleteReservationByIdReservation,[id_reservation],(error,result)=>{
                if(result.affectedRows === 0){        
                    res.status(400).json({error : error, message: httpRequestMessages.errorDeleteReservation})
                }else{
                    res.status(201).json({ message: httpRequestMessages.successDeleteReservation})
                }
            })  
        }else{
            res.status(400).json({error: error, message: httpRequestMessages.errorGetAllReservation})
        }
    })
}