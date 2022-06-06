const connection = require('../config/sql/db.config');
const commande = require('../service/CommandeService');
const client = require('../service/ClientService');
const httpRequestMessagesCommande = require('../httpRequestMessages/HttpRequestMessagesCommande');
const HttpRequestMessagesUser = require('../httpRequestMessages/HttpRequestMessagesUser');
const { 
    STATUS_BRONZE, 
    STATUS_GOLD, 
    STATUS_SILVER, 
    POINT_FIDELITE, 
    POINT_RESERVATION, 
    NUMERO_PASSAGE_TABLE_USER, 
    NUMERO_PASSAGE_TABLE_COMMANDE, 
    VALUE_MIN_GOLD,
    VALUE_MIN_SILVER,
    VALUE_MAX_SILVER,
    VALUE_MAX_BRONZE
} = require('../config/ConstantProperties');


exports.createCommande= (req,res)=>{
    const {numeroCommande, id_user, idBoutique, dateCommande, livraison, prixTotal,id_patisserie, patisseriesList} = req.body;
    console.log(id_user)
    const currentTime = new Date();
    const timeMinutes = currentTime.getMinutes()
    if(timeMinutes < 10){
        var timeMinute = '0' + timeMinutes
    }
      
    const heureCommande = currentTime.getHours() + "h" + timeMinute
    
    connection.query(client.getClientPointFideliteCommande,[id_user],(error, result)=>{
        if (result.length === undefined || result.length === [] || result[0] === undefined) {
            const pointFidelite = POINT_FIDELITE
            const pointReservation = POINT_RESERVATION
            const numero_passage = NUMERO_PASSAGE_TABLE_USER
            const numeroPassage = NUMERO_PASSAGE_TABLE_COMMANDE
            const statusFidelite = STATUS_BRONZE
            const visit = numero_passage + numeroPassage
            const bonus = pointFidelite + pointReservation
            if (error) {
                res.status(400).json({ error: error, message: HttpRequestMessagesUser.errorGetClientById })
            } else {
                connection.query(commande.createCommande, [dateCommande, heureCommande, numeroCommande, id_user, livraison, prixTotal, idBoutique, patisseriesList, id_patisserie], (error, result) => {
                    if (error) {
                        res.status(400).json({ error: error, message: httpRequestMessagesCommande.errorCreateCommande })
                    } else {
                        connection.query(client.UpdatePointFidelite, [bonus, visit, statusFidelite, id_user], (error, result) => {
                            if (error) {
                                res.status(400).json({ error: error, message: HttpRequestMessagesUser.errorUpdatePointFidelite })
                            } else {
                                res.status(200).json
                            }
                        })
                        res.status(201).json({ result: result, message: httpRequestMessagesCommande.successCreateCommande })
                    }
                })
            }
        } 
        else {
            const pointFideliteExist = result[0].pointFidelite
            const pointReservationExist = result[0].pointReservation
            const numeroPassageExist = result[0].numeroPassage
            const numero_passageExist = result[0].numero_passage
            const totalVisit = numero_passageExist + numeroPassageExist
            const totalBonus = pointFideliteExist + pointReservationExist
            if ( totalBonus > VALUE_MIN_GOLD) {
                var statusFideliteExist = STATUS_GOLD
            }
            if (totalBonus > VALUE_MIN_SILVER && pointFideliteExist < VALUE_MAX_SILVER) {   
                var statusFideliteExist = STATUS_SILVER
            }
            if (totalBonus < VALUE_MAX_BRONZE) {
                var statusFideliteExist = STATUS_BRONZE
            }
            if (error) {
                res.status(400).json({ error: error, message: HttpRequestMessagesUser.errorGetClientById })
            } else {
                connection.query(commande.createCommande, [dateCommande, heureCommande, numeroCommande, id_user, livraison, prixTotal, idBoutique, patisseriesList, id_patisserie], (error, result) => {
                    if (error) {
                        res.status(400).json({ error: error, message: httpRequestMessagesCommande.errorCreateCommande })
                    } else {
                        connection.query(client.UpdatePointFidelite, [parseInt(totalBonus), parseInt(totalVisit), statusFideliteExist, id_user], (error, result) => {
                            if (error) {
                                res.status(400).json({ error: error, message: HttpRequestMessagesUser.errorUpdatePointFidelite })
                            } else {
                                res.status(200).json
                            }
                        })
                        res.status(201).json({ result: result, message: httpRequestMessagesCommande.successCreateCommande })
                    }
                })
            }
        }
    })
}

exports.getCommandByIdCommand = (req,res)=>{
    const id_commande = req.params.id_commande
    connection.query(commande.getCommandeById,[id_commande],(error,result)=>{
        if(result < 1){
            res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandById})
        }else{
            res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandById})
        }
    })
}
exports.getCommandByVille = (req,res)=>{
    const {ville} = req.params
    connection.query(commande.getCommandeByVille,[ville],(error,result)=>{
        if(result.length < 1){
            res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByVille})
        }else{
            res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByVille})
        }
    })
}
exports.getCommandByVilleAndIdBoutique = (req,res)=>{
    const {ville, idBoutique} = req.params
    connection.query(commande.getCommandeByVilleAndIdBoutique,[ville, idBoutique],(error,result)=>{
        if(result.length < 1){
            res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByVilleAndIdBoutique})
        }else{
            res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByVilleAndIdBoutique})
        }
    })
}

exports.getCommandByIdBoutique = (req,res)=>{
    const {idBoutique} = req.params
    connection.query(commande.getCommandeByIdBoutique,[idBoutique],(error,result)=>{
        if(result < 1){
            res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByIdBoutique})
        }else{
            res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByIdBoutique})
        }
    })
}

exports.getCommandByIdBoutiqueAndNumeroCommand = (req,res)=>{
    const {idBoutique, numeroCommande} = req.params
    connection.query(commande.getCommandeByIdBoutiqueAndNumeroCommande,[idBoutique, numeroCommande],(error,result)=>{
        if(result < 1){
            res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByIdBoutiqueAndNumeroCommande})
        }else{
            res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByIdBoutiqueAndNumeroCommande})
        }
    })
}

exports.getCommandByNumeroClient = (req,res)=>{
    const { numero_client } = req.params
    connection.query(commande.getCommandeByNumeroClient,[numero_client],(error,result)=>{
        if(result < 1 ){
            res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByNumeroClient})
        }else{
            res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByNumeroClient})
        }
    })
}
exports.getCommandByNumeroCommande = (req,res)=>{
    const {numeroCommande} = req.params
    connection.query(commande.getCommandeByNumeroCommande,[numeroCommande],(error,result)=>{
        if(result < 1){
            res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByNumeroCommande})
        }else{
            res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByNumeroCommande})
        }    
    })
}
exports.getCommandByPhone = (req,res)=>{
    const {phone} = req.params
    connection.query(commande.getCommandeByPhone,[phone],(error,result)=>{
        if(result < 1){
            res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByTelephone})
        }else{
            res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByTelephone})
        }
    })
}

exports.getCommandByDateCommande = (req,res)=>{
    const {dateCommande} = req.params
    connection.query(commande.getCommandeByDateCommande,[dateCommande],(error,result)=>{ 
        if(result < 1){
            res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByDateCommande})
        }else{
            res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByDateCommande})
        }   
    })
}

exports.getCommandByAllCommande = (req,res)=>{
    connection.query(commande.getAllCommandes,(error,result)=>{
        if(result < 1){
            res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetAllCommand})
        }else{
            res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetAllCommand})
        }
    })
}

exports.updateCommandeByCritere = (req,res) =>{
    const {id_commande, numeroCommande} = req.params
    
    if(id_commande != undefined){
        connection.query(commande.getCommandeById,[id_commande],(error,result)=>{
            if(result.length > 0){     
                const {livraison, prixTotal, patisseriesList, dateCommande} = req.body
                const {numeroCommande, id_user, idBoutique} = result[0]
                connection.query(commande.updateCommandeByIdCommande,[dateCommande, numeroCommande, id_user, livraison, prixTotal, idBoutique, patisseriesList, id_commande],(error,results)=>{
                    if(livraison != undefined && prixTotal != undefined && patisseriesList != undefined && dateCommande != undefined){
                        res.status(201).json({results: results, message: httpRequestMessagesCommande.successUpdateCommandeByCriteres})
                    }else{
                        res.status(400).json({error: error, message: httpRequestMessagesCommande.errorUpdateCommandeByCritere})
                    }
                })   
            }else{
                res.status(400).json({error: error,message: httpRequestMessagesCommande.errorGetCommandByCritere})
            }
        })
    }
    if(numeroCommande != undefined ){
        connection.query(commande.getCommandeByNumeroCommande,[numeroCommande],(error,result)=>{
            if(result.length > 0){
                console.log(result.length > 0)
                const {livraison, prixTotal, patisseriesList, dateCommande} = req.body
                const { id_user, idBoutique, id_commande} = result[0]
                connection.query(commande.updateCommandeByNumeroCommande,[dateCommande, id_commande, id_user, livraison, prixTotal, idBoutique, patisseriesList, numeroCommande],(error,results)=>{
                    console.log(results)
                    if( livraison != undefined && prixTotal != undefined && patisseriesList != undefined && dateCommande != undefined){
                        res.status(201).json({results: results, message: httpRequestMessagesCommande.successUpdateCommandeByCriteres})
                    }else{
                        res.status(400).json({error: error, message: httpRequestMessagesCommande.errorUpdateCommandeByCritere})
                    }
                }) 
            }else{
                res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByNumeroCommande})
            }    
        })
    }
}


exports.deleteCommandeById = (req, res)=>{
    const id_commande = req.params.id_commande
    connection.query(commande.deleteCommande,[id_commande],(error,result) =>{
        if(result.affectedRows === 0 ){
            res.status(400).json({error: error, message: httpRequestMessagesCommande.errorDeleteCommande})
        }else{
            res.status(201).json({message: httpRequestMessagesCommande.successDeleteCommande})
        }
    })
}

