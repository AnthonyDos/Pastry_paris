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

exports.getCommandeById = (req,res)=>{

}
