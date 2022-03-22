const connection = require('../config/sql/db.config');
const boutique = require('../service/BoutiqueService');
const httpRequestMessagesBoutique = require('../httpRequestMessages/HttpRequestMessagesBoutique');

exports.createBoutique = (req, res)=>{
    const { nomBoutique, adresse, ville, codePostal, pays, phone, horaire} = req.body
    connection.query(boutique.createBoutique,[nomBoutique, adresse, ville, codePostal, pays, phone, horaire],(error,results)=>{
        if(error){
            res.status(400).json({error: error, message: httpRequestMessagesBoutique.errorCreateBoutique})
        }else{
            res.status(201).json({results: results, message: httpRequestMessagesBoutique.successCreateBoutique})
        }
    })
}

exports.getAllBoutiques = (req, res)=>{
    connection.query(boutique.getAllBoutiques,(error,results)=>{
        if(error){
            res.status(400).json({error: error, message: httpRequestMessagesBoutique.errorGetAllBoutique})
        }else{
            res.status(200).json({results: results, message: httpRequestMessagesBoutique.successGetAllBoutique})
        }
    })
}

exports.getBoutiqueByCriteres = (req, res)=>{
    const {idBoutique, ville, pays} = req.params 
    if(idBoutique != undefined && ville === undefined && pays === undefined){
        connection.query(boutique.getBoutiqueByIdBoutique,[idBoutique],(error,result)=>{
            if(result.length > 0 ){
                res.status(201).json({ result: result, message: httpRequestMessagesBoutique.successGetBoutiqueByCritere})
            }else{
                res.status(400).json({ error: error, message: httpRequestMessagesBoutique.errorGetBoutiqueByCritere})
            }
        })
    }else if(ville != undefined && idBoutique === undefined && pays === undefined){
        connection.query(boutique.getBoutiqueByVille,[ville],(error,result)=>{
            if(result.length > 0){
                res.status(201).json({ result: result, message: httpRequestMessagesBoutique.successGetBoutiqueByCritere})
            }else{
                res.status(400).json({ error: error, message: httpRequestMessagesBoutique.errorGetBoutiqueByCritere})
            }
        })
    }else if(pays != undefined && ville === undefined && idBoutique === undefined){
        connection.query(boutique.getBoutiqueByPays,[pays],(error,result)=>{
            if(result.length > 0){
                res.status(201).json({ result: result, message: httpRequestMessagesBoutique.successGetBoutiqueByCritere})
            }else{
                res.status(400).json({ error: error, message: httpRequestMessagesBoutique.errorGetBoutiqueByCritere})
            }
        })
    }else{
        res.status(400).json({error: error, message: httpRequestMessagesBoutique.errorGetBoutiqueByCritere})
    }
}