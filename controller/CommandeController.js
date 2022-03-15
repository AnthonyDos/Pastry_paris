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
            if(error){
                res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByCritere})
            }else{
                if(result < 1){
                    res.status(404).json({error: error, message: httpRequestMessagesCommande.errorGetCommandById})
                }else{
                    res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandById})
                }
            }
        })
    }else if(ville){
        console.log(ville)
        connection.query(commande.getCommandeByVille,[ville],(error,result)=>{
            if(error){
                res.status(400).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByCritere})
            }else{
                if(result.length < 1){
                    res.status(404).json({error: error, message: httpRequestMessagesCommande.errorGetCommandByVille})
                }else{
                    res.status(201).json({result : result, message: httpRequestMessagesCommande.successGetCommandByVille})
                }
            }
        })
    }else{

    }
}
