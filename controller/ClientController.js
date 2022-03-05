const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const connection = require('../config/sql/db.config');
const userException = require('../exception/UserException');
const {
    getAllClients, 
    getClientById, 
    getClientByNumeroClient, 
    getClientByPhone, 
    getClientByEmail, 
    getAllClientByCodePostal, 
    createClient, 
    connectClient, 
    updateClient
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
        return res.status(400).json({err: err, message : userException.errorPasswordNoRespectRegex});
    };

    let regexEmail = REGEX_EMAIL  
    if(!regexEmail.test(req.body.email)){    
        return res.json({ message: userException.errorEmailNoRespectRegex}) 
    }

    if(req.body.email){
        connection.query(getClientByEmail, [req.body.email], (err, result) =>{  
            if (err){   
                res.status(401).json({err: err})
            }else {        
                if(result[0] != undefined){
                    res.status(401).json({ err:err , message: userException.errorEmailExiste})
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
                            res.status(401).json({err:err, message: userException.errorClientNonCreer})                     
                        }else { 
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
                                res.status(401).json({error: error, message: userException.errorClientEmailPasswordNoCorrespond})
                            }                            
                            res.status(201).json({result, message: userException.successCreateClient})
                        }
                    })                   
                } 
            }
        })    
    }else{
        res.status(401).json({ err: err, message: userException.errorCreateClientEmail})
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
        return res.status(400).json({err: err, message : userException.errorPasswordNoRespectRegex});
    };

    let regexEmail = REGEX_EMAIL  
    if(!regexEmail.test(req.body.email)){    
        return res.json({ message: userException.errorEmailNoRespectRegex}) 
    }
    connection.query(connectClient ,[req.body.email], async function(error, results, fields){
        if (error){
            res.status(401).json({error: error ,message: userException.errorClientEchecConnexion})
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
                        "success": "login trouvé"                       
                    })     
                }else { 
                    res.status(401).json({error: error, message: userException.errorClientEmailPasswordNoCorrespond})
                }
            }else{
                res.status(401).json({error : error ,message: userException.errorEmailNotExist})
            }
        }
    })
}

exports.getAllClients = (req, res) =>{
    const codePostal = req.params.codePostal
    if(!codePostal){
        connection.query(getAllClients,(error,results)=>{
            if (results != undefined) {
                res.status(201).json({results :results, message : userException.successGetAllClient})
            }else{
                res.status(400).json({error:error,message: userException.errorGetAllClient})
            }
        })
    }else if(codePostal != undefined){
        connection.query(getAllClientByCodePostal,[codePostal],(error,results)=>{
            if (results[0].length === req.body.codePostal) {
                res.status(201).json({results :results, message : userException.successGetAllClientByCodePostal})
            }else{
                res.status(400).json({error:error,message: userException.errorGetAllClient})
            }
        })
    }else{
        res.status(400).json({error:error,message: userException.errorGetAllClient})
    }
}

exports.getClientByCritere = (req, res) =>{
    const id_user = req.params.id_user
    const numero_client = req.params.numero_client
    const phone = req.params.phone
    const nom = req.params.nom
    if (id_user) {
        connection.query(getClientById,[id_user , numero_client],(error, result, fields)=>{
            if (result[0] != undefined) {
                res.status(201).json({result :result[0], message : userException.successGetClientById})
            }else{                 
                res.status(400).json({error:error,message: userException.errorGetClientById})
            }     
        })
    }else if(numero_client){
        connection.query(getClientByNumeroClient,[numero_client],(error, result, fields)=>{
            if (result[0] != undefined) {
                res.status(201).json({result :result[0], message : userException.successGetClientByNumeroClient})
            }else{                 
                res.status(400).json({error:error,message: userException.errorAucunClientByNumeroClient})
            }     
        })
    }else if(phone){
        connection.query(getClientByPhone,[phone],(error, result, fields)=>{
            if (result != undefined) {
                res.status(201).json({result :result, message : userException.successGetClientByNumeroPhone})
            }else{                 
                res.status(400).json({error:error,message: userException.errorAucunClientByNumeroTelephone})
            }     
        })
    }else if(nom){
        if(nom.length < 3){
            res.status(400).json({ message : userException.errorRechercheByNomCaractereMin3})
        }else{
            connection.query(`SELECT * FROM users WHERE  nom LIKE '${nom}%' `,(error, result, fields)=>{
                if (result.length > 0) {
                    res.status(201).json({result :result, message : userException.successGetClientByNom})
                }else if(result.length === null || result.length < 0){                 
                    res.status(400).json({error:error,message: userException.errorAucunClientByNom})
                }else{                 
                    res.status(400).json({error:error,message: userException.errorAucunClient})
                }        
            })
        }
    }else{
        res.status(400).json({error : error, message: userException.errorAucunClient})
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
            res.status(401).json({error: error, message: userException.errorClientEchecConnexion})
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
                        res.status(401).json({error: error, message: userException.errorUpdateClient})
                    }else{
                        res.status(201).json({result: result, message: userException.successModification})
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
                        res.status(401).json({error: error, message: userException.errorUpdateClient})
                    }else{
                        res.status(201).json({result: result, message: userException.successModification})
                    }
                })
            }else{
                if(password.match(REGEX_PASSWORD)){
                    res.status(201).json        
                }else{ 
                    return res.status(400).json({message : userException.errorPasswordNoRespectRegex});
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
                        res.status(401).json({error: error, message: userException.errorUpdateClient})
    
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
                            res.status(401).json({error: error, message: userException.errorClientEmailPasswordNoCorrespond})
                        } 
                        res.status(201).json({result: result, message: userException.successModification})
                    }
                })
            }
        }
    })
}


//     res.json(isError(member) ? error(member.message) : success(member))


// const allPostsSql= `SELECT posts.id_post,posts.imageProfile,users.imageProfile ,posts.username, posts.imageUrl,posts.isAdmin, posts.postUser, users.id_user, users.username,DATE_FORMAT(posts.date_post, '%d/%m/%Y %Hh%imin%ss') AS date_post FROM posts INNER JOIN users ON posts.id_user = users.id_user ORDER BY posts.date_post DESC; `
