const connection = require('../config/sql/db.config');
const patisserie = require('../service/PatisserieService');
const httpRequestMessagesPatisserie = require('../httpRequestMessages/HttpRequestMessagesPatisserie');

exports.createPatisserie = (req, res)=>{
    const {nomProduit, ingredients, prix, numeroProduit, idBoutique} = req.body
    connection.query(patisserie.createPatisserie,[idBoutique,nomProduit, ingredients, prix,numeroProduit], (error, result)=>{
        if(error){
            res.status(400).json({error: error, message: httpRequestMessagesPatisserie.errorCreatePatisserie})
        }else{
            res.status(200).json({result: result, message: httpRequestMessagesPatisserie.successCreatePatisserie})
        }
    })
}

exports.getAllPatisserie = (req, res)=>{
    connection.query(patisserie.getAllPatisseries,(error,result)=>{
        if(error){
            res.status(400).json({error: error, message: httpRequestMessagesPatisserie.errorGetAllPatisseries})
        }else{
            res.status(200).json({result: result, message: httpRequestMessagesPatisserie.successGetAllPatisseries})
        }
    })
}

exports.getPatisserieByCritere = (req,res)=>{
    const {id_patisserie, idBoutique} = req.params 
    if(id_patisserie != undefined && idBoutique === undefined){
        connection.query(patisserie.getPatisserieByIdPatisserie,[id_patisserie],(error,result)=>{
            if(result.length > 0){
                res.status(201).json({result: result, message: httpRequestMessagesPatisserie.successGetPatisserieByCriteres})
            }else{
                res.status(400).json({error: error, message: httpRequestMessagesPatisserie.errorGetPatisserieByCriteres})
            }
        })
    }else if(idBoutique != undefined && id_patisserie === undefined){
        connection.query(patisserie.getPatisserieByIdBoutique,[idBoutique],(error,result)=>{
            if(result.length > 0){
                res.status(201).json({result: result, message: httpRequestMessagesPatisserie.successGetPatisserieByCriteres})
            }else{
                res.status(400).json({error: error, message: httpRequestMessagesPatisserie.errorGetPatisserieByCriteres})
            }
        })
    }else{
        res.status(400).json({message: httpRequestMessagesPatisserie.errorGetPatisserie})  
    }
}

exports.updatePatisserie = (req,res)=>{
    const {id_patisserie} = req.params 
    if(id_patisserie){
        connection.query(patisserie.getPatisserieByIdPatisserie,[id_patisserie],(error,result)=>{
            if(result.length > 0){
                const {id_patisserie, idBoutique} = result[0] 
                const {nomProduit, ingredients, prix, numeroProduit} = req.body
                connection.query(patisserie.updatePatisserieByIdPatisserie,[nomProduit,ingredients,prix, numeroProduit,idBoutique, id_patisserie],(error,result)=>{
                    if(error){
                        res.status(400).json({error: error, message:httpRequestMessagesPatisserie.errorUpdatePatisserie})
                    }else{
                        res.status(200).json({result: result, message: httpRequestMessagesPatisserie.successUpdatePatisserie})
                    }
                })
            }else{
                res.status(400).json({error: error, message: httpRequestMessagesPatisserie.errorGetPatisserieByCriteres})
            }
        })
    }else{
        res.status(400).json({message: httpRequestMessagesPatisserie.errorGetPatisserieByCriteres})
    }
}

exports.deletePatisserie = (req, res)=>{
    const {id_patisserie} = req.params
    connection.query(patisserie.deletePatisserieByIdPatisserie,[id_patisserie],(error,result)=>{
        if(result.affectedRows === 0 ){
            res.status(400).json({error: error, message: httpRequestMessagesPatisserie.errorDeletePatisserie})
        }else{
            res.status(201).json({message: httpRequestMessagesPatisserie.successDeletePatisserie})
        }
    })
}