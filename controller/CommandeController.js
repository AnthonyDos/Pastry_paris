const connection = require('../config/sql/db.config');
const commande = require('../service/CommandeService');
const httpRequestMessagesCommande = require('../httpRequestMessages/HttpRequestMessagesCommande');

exports.createCommande= (req,res)=>{
    const {numeroCommande, id_user, idBoutique, dateCommande, livraison, prixTotal, patisseries} = req.body;
    connection.query(commande.createCommande,[dateCommande, numeroCommande, id_user, livraison, prixTotal, idBoutique, patisseries ],(error,result)=>{
        if(error){
            res.status(400).json({error: error, message:httpRequestMessagesCommande.errorCreateCommande})
        }else{
            res.status(201).json({result: result, message: httpRequestMessagesCommande.successCreateCommande})
        }
    })
}

exports.getCommandeByCritere = (req,res)=>{
    const {
        id_commande,
        ville,
        idBoutique, 
        numero_client,
        numeroCommande,
        phone,
        dateCommande
    } = req.params
    
    if (id_commande) {
        connection.query(commande.getCommandeById,[id_commande],(error,result)=>{
            if(result < 1){
                res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandById})
            }else{
                res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandById})
            }
        })
    }else if(ville && idBoutique === undefined){
        connection.query(commande.getCommandeByVille,[ville],(error,result)=>{
            if(result.length < 1){
                res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByVille})
            }else{
                res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByVille})
            }
        })
    }else if(ville && idBoutique){
        connection.query(commande.getCommandeByVilleAndIdBoutique,[ville, idBoutique],(error,result)=>{
            if(result.length < 1){
                res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByVilleAndIdBoutique})
            }else{
                res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByVilleAndIdBoutique})
            }
        })
    }else if(idBoutique && ville === undefined && numeroCommande === undefined){
        connection.query(commande.getCommandeByIdBoutique,[idBoutique],(error,result)=>{
            if(result < 1){
                res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByIdBoutique})
            }else{
                res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByIdBoutique})
            }
        })
    }else if(idBoutique && numeroCommande){
        connection.query(commande.getCommandeByIdBoutiqueAndNumeroCommande,[idBoutique, numeroCommande],(error,result)=>{
            if(result < 1){
                res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByIdBoutiqueAndNumeroCommande})
            }else{
                res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByIdBoutiqueAndNumeroCommande})
            }
        })
    }else if(numero_client){
        connection.query(commande.getCommandeByNumeroClient,[numero_client],(error,result)=>{
            if(result < 1){
                res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByNumeroClient})
            }else{
                res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByNumeroClient})
            }
        })
    }else if(numeroCommande && idBoutique === undefined){
        connection.query(commande.getCommandeByNumeroCommande,[numeroCommande],(error,result)=>{
            if(result < 1){
                res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByNumeroCommande})
            }else{
                res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByNumeroCommande})
            }    
        })
    }else if(phone){
        connection.query(commande.getCommandeByPhone,[phone],(error,result)=>{
            if(result < 1){
                res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByTelephone})
            }else{
                res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByTelephone})
            }
        })
    }else if(dateCommande){
        connection.query(commande.getCommandeByDateCommande,[dateCommande],(error,result)=>{ 
            if(result < 1){
                res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByDateCommande})
            }else{
                res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByDateCommande})
            }   
        })
    }else if(
        id_commande === undefined 
        && ville === undefined 
        && idBoutique === undefined 
        && numero_client === undefined 
        && numeroCommande === undefined 
        && phone === undefined 
        && dateCommande === undefined
        ){
        connection.query(commande.getAllCommandes,(error,result)=>{
            if(result < 1){
                res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetAllCommand})
            }else{
                res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetAllCommand})
            }
        })
    }else{
        res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByCritere})
    }
}


exports.updateCommandeByCritere = (req,res) =>{
    const {id_commande, numeroCommande} = req.params
    
    if(id_commande != undefined){
        connection.query(commande.getCommandeById,[id_commande],(error,result)=>{
            if(result.length > 0){     
                const {livraison, prixTotal, patisseries, dateCommande} = req.body
                const {numeroCommande, id_user, idBoutique} = result[0]
                connection.query(commande.updateCommandeByIdCommande,[dateCommande, numeroCommande, id_user, livraison, prixTotal, idBoutique, patisseries, id_commande],(error,results)=>{
                    if(livraison != undefined && prixTotal != undefined && patisseries != undefined && dateCommande != undefined){
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
                const {livraison, prixTotal, patisseries, dateCommande} = req.body
                const { id_user, idBoutique, id_commande} = result[0]
                connection.query(commande.updateCommandeByNumeroCommande,[dateCommande, id_commande, id_user, livraison, prixTotal, idBoutique, patisseries, numeroCommande],(error,results)=>{
                    console.log(results)
                    if( livraison != undefined && prixTotal != undefined && patisseries != undefined && dateCommande != undefined){
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