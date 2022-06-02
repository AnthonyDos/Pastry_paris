const connection = require('../config/sql/db.config');
const commande = require('../service/CommandeService');
const client = require('../service/ClientService');
const httpRequestMessagesCommande = require('../httpRequestMessages/HttpRequestMessagesCommande');
const HttpRequestMessagesUser = require('../httpRequestMessages/HttpRequestMessagesUser');

exports.createCommande= (req,res)=>{
    const {numeroCommande, id_user, idBoutique, dateCommande, livraison, prixTotal, patisseries} = req.body;
    const currentTime = new Date();
    const timeMinutes = currentTime.getMinutes()
    if(timeMinutes < 10){
        var timeMinute = '0' + timeMinutes
    }
      
    const heureCommande = currentTime.getHours() + "h" + timeMinute
    
    connection.query(client.getClientPointFideliteCommande,[id_user],(error, result)=>{
        const {pointFidelite,pointReservation,numero_passage, numeroPassage} = result[0]
        if(pointFidelite + pointReservation > 9 && pointFidelite < 49){
            statusFidelite = "argent"
        }
        if(pointFidelite + pointReservation > 49){
            statusFidelite = "Or"
        }
        if(pointFidelite + pointReservation < 9){
            statusFidelite = "bronze"
        }
        if (error) {
            res.status(400).json({error: error, message: HttpRequestMessagesUser.errorGetClientById})
        }else{
            
            connection.query(commande.createCommande,[dateCommande,heureCommande, numeroCommande, id_user, livraison, prixTotal, idBoutique, patisseries ],(error,result)=>{
                if(error){
                    res.status(400).json({error: error, message:httpRequestMessagesCommande.errorCreateCommande})
                }else{
                    
                    connection.query(client.UpdatePointFidelite,[pointFidelite + pointReservation,numero_passage + numeroPassage,statusFidelite, id_user],(error, result)=>{
                        if (error) {
                            res.status(400).json({error: error, message: HttpRequestMessagesUser.errorUpdatePointFidelite})
                        }else{
                            res.status(200).json
                        }
                    })
                    res.status(201).json({result: result, message: httpRequestMessagesCommande.successCreateCommande})
                }
            })
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
    const {numero_client} = req.params
    connection.query(commande.getCommandeByNumeroClient,[numero_client],(error,result)=>{
        console.log(result)
        if(result < 1 ){
            console.log(error)
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

