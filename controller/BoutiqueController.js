const connection = require('../config/sql/db.config');
const boutique = require('../service/BoutiqueService');
const httpRequestMessagesBoutique = require('../httpRequestMessages/HttpRequestMessagesBoutique');
const fs = require('fs')
require('dotenv').config();

exports.createBoutique = (req, res)=>{
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file?.filename}`
    console.log(imageUrl)
    const { nomBoutique, adresse, ville, codePostal, pays, phone, horaire,placeDisponible} = req.body
    connection.query(boutique.createBoutique,[nomBoutique, adresse, ville, codePostal, pays, phone, horaire, imageUrl,placeDisponible],(error,results)=>{
        console.log({error: error})
        console.log({results: results})
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

exports.updateBoutique = (req, res)=>{
    const {idBoutique} = req.params
    connection.query(boutique.getBoutiqueByIdBoutique,[idBoutique],(error,result)=>{
        if(result.length > 0 ){
            const {nomBoutique, adresse,  codePostal,ville, pays, phone, horaire} = req.body
            const {idBoutique} = result[0]
            connection.query(boutique.updateBoutiqueByIdBoutique,[nomBoutique,adresse, codePostal, ville, pays,phone, horaire, idBoutique],(error,result)=>{
                if(error){
                    res.status(400).json({error: error, message: httpRequestMessagesBoutique.errorUpdateBoutique})
                }else{
                    res.status(201).json({result: result, message: httpRequestMessagesBoutique.successUpdateBoutique})
                }
            })
        }else{
            res.status(400).json({ error: error, message: httpRequestMessagesBoutique.errorGetBoutiqueByCritere})
        }
    })
}

exports.deleteBoutiqueById = (req, res)=>{
    const {idBoutique} = req.params
    connection.query(boutique.deleteBoutiqueById,[idBoutique],(error,result)=>{
        if(result.affectedRows === 0 ){
            res.status(400).json({error: error, message: httpRequestMessagesBoutique.errorDeleteBoutiqueById})
        }else{
            res.status(201).json({message: httpRequestMessagesBoutique.successDeleteBoutiqueById})
        }
    })
}