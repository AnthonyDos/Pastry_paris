const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const connection = require('../config/sql/db.config');
const httpRequestMessages = require('../httpRequestMessages/HttpRequestMessagesUser');
const {
    getAllClients, 
    getClientById, 
    getClientByNumeroClient, 
    getClientByPhone, 
    getClientByEmail, 
    getAllClientByCodePostal, 
    createClient, 
    connectClient, 
    updateClient,
    deleteClient,
    UpdatePassword
} = require('../service/ClientService');
const {REGEX_EMAIL, REGEX_PASSWORD } =require('../config/Regex');

exports.createClient = async (req, res) =>{
    const encryptedPassword =   await  bcrypt.hash(req.body.password, 10);
    const password = req.body.password
    const password_regex = REGEX_PASSWORD 
    id_user = req.body.id_user
  
    if(password.match(password_regex)){
        res.status(201).json        
    }else{ 
        return res.status(400).json({message : httpRequestMessages.errorPasswordNoRespectRegex});
    };

    let regexEmail = REGEX_EMAIL  
    if(!regexEmail.test(req.body.email)){    
        return res.json({ message: httpRequestMessages.errorEmailNoRespectRegex}) 
    }

    if(req.body.email){
        connection.query(getClientByEmail, [req.body.email], (err, result) =>{  
            if (err){   
                res.status(401).json({err: err})
            }else {        
                if(result[0] != undefined){
                    res.status(401).json({ err:err , message: httpRequestMessages.errorEmailExiste})
                }else {               
                    connection.query(createClient,
                        [
                            req.body.nom,
                            req.body.prenom, 
                            req.body.email, 
                            encryptedPassword, 
                            req.body.phone, 
                            req.body.adresse, 
                            req.body.ville, 
                            req.body.codePostal, 
                            req.body.pays, 
                            req.params.id_user
                        ],(error,result)=>{  
                        if (err){
                            res.status(401).json({err:err, message: httpRequestMessages.errorClientNonCreer})                     
                        }else { 
                            let comparePassword = bcrypt.hash(req.body.password, 10 )    
                            if (comparePassword){
                                return res.status(200).json({
                                    email: req.body.email,
                                    id_user: req.params.id_user,                                 
                                    token: jwt.sign({ id_user: req.params.id_user},
                                        process.env.JWT_TOKEN,
                                        { expiresIn: '12h' }),
                                        "success": httpRequestMessages.successCreateClient
                                })      
                            }else{
                                res.status(401).json({error: error, message: httpRequestMessages.errorClientEmailPasswordNoCorrespond})
                            }                            
                        }
                    })                   
                } 
            }
        })    
    }else{
        res.status(401).json({ err: err, message: httpRequestMessages.errorCreateClientEmail})
        console.log(err)
    }   
}

exports.connectClient = async (req, res) =>{
    
    const encryptedPassword =   await  bcrypt.hash(req.body.password, 10);
    const password = req.body.password
    const password_regex = REGEX_PASSWORD 
    id_user = req.body.id_user

    if(password.match(password_regex)){
        res.status(201).json        
    }else{ 
        return res.status(400).json({ message : httpRequestMessages.errorPasswordNoRespectRegex});
    };

    let regexEmail = REGEX_EMAIL  
    if(!regexEmail.test(req.body.email)){    
        return res.json({ message: httpRequestMessages.errorEmailNoRespectRegex}) 
    }
    connection.query(connectClient ,[req.body.email], async function(error, results, fields){
        if (error){
            res.status(401).json({error: error ,message: httpRequestMessages.errorClientEchecConnexion})
        }else{
            if (results.length > 0){
                const comparePassword = await bcrypt.compare(password, results[0].password)
                if(comparePassword){
                    res.status(201).json({                     
                        id_user: results[0].id_user,                   
                            token: jwt.sign (
                            {id_user: results[0].id_user},                              
                            process.env.JWT_TOKEN,
                            { expiresIn: '24h' } 
                        ),                                                 
                        "success":  httpRequestMessages.successClientConnect                   
                    })     
                }else { 
                    res.status(401).json({error: error, message: httpRequestMessages.errorClientEmailPasswordNoCorrespond})
                }
            }else{
                res.status(401).json({error : error ,message: httpRequestMessages.errorEmailNotExist})
            }
        }
    })
}

exports.getAllClients = (req, res) =>{
    const codePostal = req.params.codePostal
    if(!codePostal){
        connection.query(getAllClients,(error,results)=>{
            if (results != undefined) {
                res.status(201).json({results :results, message : httpRequestMessages.successGetAllClient})
            }else{
                res.status(404).json({error:error,message: httpRequestMessages.errorGetAllClient})
            }
        })
    }else if(codePostal != undefined){
        connection.query(getAllClientByCodePostal,[codePostal],(error,results)=>{
            if (results[0].length === req.body.codePostal) {
                res.status(201).json({results :results, message : httpRequestMessages.successGetAllClientByCodePostal})
            }else{
                res.status(404).json({error:error,message: httpRequestMessages.errorGetAllClient})
            }
        })
    }else{
        res.status(400).json({error:error,message: httpRequestMessages.errorGetAllClient})
    }
}

exports.getClientByCritere = (req, res) =>{
    const { id_user, numero_client, phone, nom} = req.params
    if (id_user) {
        connection.query(getClientById,[id_user , numero_client],(error, result, fields)=>{
            if (result[0] != undefined) {
                res.status(201).json({result :result[0], message : httpRequestMessages.successGetClientById})
            }else{                 
                res.status(404).json({error:error,message: httpRequestMessages.errorGetClientById})
            }     
        })
    }else if(numero_client){
        connection.query(getClientByNumeroClient,[numero_client],(error, result, fields)=>{
            if (result[0] != undefined) {
                res.status(201).json({result :result[0], message : httpRequestMessages.successGetClientByNumeroClient})
            }else{                 
                res.status(404).json({error:error,message: httpRequestMessages.errorAucunClientByNumeroClient})
            }     
        })
    }else if(phone){
        connection.query(getClientByPhone,[phone],(error, result, fields)=>{
            if (result != undefined) {
                res.status(201).json({result :result, message : httpRequestMessages.successGetClientByNumeroPhone})
            }else{                 
                res.status(404).json({error:error,message: httpRequestMessages.errorAucunClientByNumeroTelephone})
            }     
        })
    }else if(nom){
        if(nom.length < 3){
            res.status(404).json({ message : httpRequestMessages.errorRechercheByNomCaractereMin3})
        }else{
            connection.query(`SELECT * FROM users WHERE  nom LIKE '${nom}%' `,(error, result, fields)=>{
                if (result.length > 0) {
                    res.status(201).json({result :result, message : httpRequestMessages.successGetClientByNom})
                }else if(result.length === null || result.length < 0){                 
                    res.status(404).json({error:error,message: httpRequestMessages.errorAucunClientByNom})
                }else{                 
                    res.status(404).json({error:error,message: httpRequestMessages.errorAucunClient})
                }        
            })
        }
    }else{
        res.status(400).json({error : error, message: httpRequestMessages.errorAucunClient})
    }
}


exports.updateClient = async (req, res) =>{
    const encryptedPassword =   await  bcrypt.hash(req.body.password, 10);
    const {nom, prenom, email, password, phone, adresse, ville,codePostal, pays} =req.body
    connection.query(getClientById,[req.params.id_user],(error,result)=>{
        const recuperationPassword = result[0].password
        const recuperationEmail = result[0].email
        console.log(recuperationEmail)
        if(error){
            res.status(404).json({error: error, message: httpRequestMessages.errorClientEchecConnexion})
        }else{
            if(password === null || password === ""){  
                connection.query(updateClient,
                    [
                        nom, 
                        prenom, 
                        email, 
                        recuperationPassword, 
                        phone, 
                        adresse, 
                        ville,
                        codePostal, 
                        pays, 
                        null, 
                        req.params.id_user
                    ],(error, result) =>{
                    console.log(req.params.password)
                    if(error){
                        res.status(404).json({error: error, message: httpRequestMessages.errorUpdateClient})
                    }else{
                        res.status(201).json({result: result, message: httpRequestMessages.successModification})
                    }
                })
            }else if(email === null || email === ""){
                connection.query(updateClient,
                    [
                        nom, 
                        prenom, 
                        recuperationEmail, 
                        encryptedPassword, 
                        phone, 
                        adresse, 
                        ville,
                        codePostal, 
                        pays, 
                        null, 
                        req.params.id_user
                    ],(error, result) =>{
                    console.log(req.params.password)
                    if(error){
                        res.status(404).json({error: error, message: httpRequestMessages.errorUpdateClient})
                    }else{
                        res.status(201).json({result: result, message: httpRequestMessages.successModification})
                    }
                })
            }else{
                if(password.match(REGEX_PASSWORD)){
                    res.status(201).json        
                }else{ 
                    return res.status(404).json({message : httpRequestMessages.errorPasswordNoRespectRegex});
                };
                connection.query(updateClient,
                    [
                        nom, 
                        prenom, 
                        email, 
                        encryptedPassword, 
                        phone, 
                        adresse, 
                        ville,
                        codePostal, 
                        pays, 
                        null, 
                        req.params.id_user
                    ],(error, result) =>{
                    if(error){
                        res.status(404).json({error: error, message: httpRequestMessages.errorUpdateClient})
    
                    }else{
                        let comparePassword = bcrypt.hash(req.body.password, 10 )  
                        if (comparePassword){
                            return res.status(200).json({
                                email: req.body.email,
                                id_user: req.params.id_user,                                 
                                token: jwt.sign({ id_user: req.params.id_user},
                                    process.env.JWT_TOKEN,
                                    { expiresIn: '12h' })
                            }) 
                        }else{
                            res.status(404).json({error: error, message: httpRequestMessages.errorClientEmailPasswordNoCorrespond})
                        } 
                        res.status(201).json({result: result, message: httpRequestMessages.successModification})
                    }
                })
            }
        }
    })
}

exports.deleteClient = (req,res) =>{
    connection.query(getClientById, [req.params.id_user],(error,result) =>{
        if(error){
            res.status(401).json({error: error, message: httpRequestMessages.errorGetClientById})
        }else{
            if(result[0] != undefined){
                connection.query(deleteClient,[req.params.id_user],(error,result)=>{
                    if(error){
                        res.status(404).json({error: error, message : httpRequestMessages.errorDeleteClient})
                    }else{
                        res.status(201).json({success : true, message: httpRequestMessages.successDeleteClient})
                    }
                })
            }else{
                res.status(401).json({error: error, message: httpRequestMessages.errorGetClientById})
            }
        }
    })
}

exports.updateClientPassword = async (req, res) =>{
    const encryptedPassword =   await  bcrypt.hash(req.body.password, 10);
    const { password } =req.body
    connection.query(getClientById,[req.params.id_user],(error,result)=>{
        const recuperationPassword = result[0]
        if(error){
            res.status(401).json({error: error, message: httpRequestMessages.errorClientEchecConnexion})
        }else{
            if(password === null || password === ""){  
                connection.query(UpdatePassword,[recuperationPassword.password,req.params.id_user],(error, result) =>{
                    console.log(req.params.password)
                    if(error){
                        res.status(404).json({error: error, message: httpRequestMessages.errorUpdatePasswordClient})
                    }else{
                        res.status(201).json({result: result, message: httpRequestMessages.successUpdatePassword})
                    }
                })
            }else{
                connection.query(UpdatePassword,[encryptedPassword, req.params.id_user],(error, result) =>{
                    if(error){
                        res.status(404).json({error: error, message: httpRequestMessages.errorUpdatePasswordClient})
                    }else{
                        res.status(201).json({result: result, message: httpRequestMessages.successUpdatePassword})
                    }
                })
            }
        }
    })
}