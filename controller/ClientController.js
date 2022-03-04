const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const cryptojs= require('crypto-js');
// const  {json}  = require('body-parser');
// const { token } = require('morgan');
// const app = require('../app');
// const { enc } = require('crypto-js');
require('dotenv').config();
const connection = require('../config/sql/db.config');
const userException = require('../exception/UserException');
const getClient = require('../service/ClientService');


exports.createClient = async (req, res) =>{
    exports.req = req.body
    const encryptedPassword =   await  bcrypt.hash(req.body.password, 10);
    const password = req.body.password
    console.log(password)
    const password_regex = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/; 
    id_user = req.body.id_user
  
    if(password.match(password_regex)){
        res.status(201).json        
    }else{ 
        return res.status(400).json({err: 'le mot de passe n est pas valide'});
    };
    if(req.body.email){
        connection.query('SELECT users.email, users.password, users.id_user FROM users WHERE  email = ?', [req.body.email], (err, result) =>{  
            console.log(req.body.email)
            if (err){   
                res.status(401).json({err: err})
            }else {        
                if(result[0] != undefined){
                    res.status(401).json({ error: "l'email existe déjà !"})
                }else {               
                   // connection.query('INSERT INTO users SET nom= ?, prenom= ?, email= ?, password= ?, phone= ?, adresse= ?, ville= ?, codePostal= ?, pays= ?, numero_client= ?', [req.body.nom, req.body.prenom, req.body.email, encryptedPassword, req.body.phone, req.body.adresse, req.body.ville, req.body.codePostal, req.body.pays, id_user], (err, result)=>{
                    connection.query(getClient.createClient,[req.body.nom, req.body.prenom, req.body.email, encryptedPassword, req.body.phone, req.body.adresse, req.body.ville, req.body.codePostal, req.body.pays, req.body.numero_client],(error,result)=>{  
                        console.log(error)   
                        console.log(result)   
                        console.log(req.body)
                        if (err){
                            res.status(401).json({err:err})                     
                        }else { 
                            console.log(password)
                            let comparePassword = bcrypt.hash(req.body.password, 10 )    
                            if (comparePassword){
                                console.log(comparePassword)
                                console.log(req.body.id_user)
                                return res.status(200).json({
                                    email: req.body.email,
                                    id_user: req.params.id_user,                                 
                                    token: jwt.sign({ id_user: req.params.id_user},
                                        process.env.JWT_TOKEN,
                                        { expiresIn: '12h' })
                                }) 
                            }else{
                                res.status(401).json({error: error,"error": "Email et le mot de passe ne correspondent pas"})
                            }                            
                            res.status(201).json({message:'inscription pris en compte'})
                        }
                    })                   
                } 
            }
        })    
    }else{
        res.status(401).json({ err: 'no name value'})
        console.log(err)
    }   
}

exports.getAllClients = (req, res) =>{
    const codePostal = req.params.codePostal
    console.log(codePostal)
    if(!codePostal){
        connection.query(getClient.getAllClients,(error,results)=>{
            if (results != undefined) {
                res.status(201).json({results :results, message : userException.successGetAllClient})
            }else{
                res.status(400).json({error:error,message: userException.errorGetAllClient})
            }
        })
    }else if(codePostal != undefined){
        connection.query(getClient.getAllClientByCodePostal,[codePostal],(error,results)=>{
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
    //exports.id_user = req.params.id_user
    //exports.numero_client = req.params.numero_client
    const id_user = req.params.id_user
    const numero_client = req.params.numero_client
    const phone = req.params.phone
    //console.log(numero_client)
    if (id_user) {
        connection.query(getClient.getClientById,[id_user , numero_client],(error, result, fields)=>{
            //connection.query(getClient.getClientById,(error, result, fields)=>{
            if (result[0] != undefined) {
                res.status(201).json({result :result[0], message : userException.successGetClientById})
            }else{                 
                res.status(400).json({error:error,message: userException.errorGetClientById})
            }     
        })
    }else if(numero_client){
        connection.query(getClient.getClientByNumeroClient,[numero_client],(error, result, fields)=>{
            if (result[0] != undefined) {
                res.status(201).json({result :result[0], message : userException.successGetClientByNumeroClient})
            }else{                 
                res.status(400).json({error:error,message: userException.errorAucunClientByNumeroClient})
            }     
        })
    }else if(phone){
        connection.query(getClient.getClientByPhone,[phone],(error, result, fields)=>{
            if (result != undefined) {
                res.status(201).json({result :result, message : userException.successGetClientByNumeroPhone})
            }else{                 
                res.status(400).json({error:error,message: userException.errorAucunClientByNumeroTelephone})
            }     
        })
    }else{
        res.status(400).json({error : error, message: userException.errorAucunClient})
    }
}


//     res.json(isError(member) ? error(member.message) : success(member))


// const allPostsSql= `SELECT posts.id_post,posts.imageProfile,users.imageProfile ,posts.username, posts.imageUrl,posts.isAdmin, posts.postUser, users.id_user, users.username,DATE_FORMAT(posts.date_post, '%d/%m/%Y %Hh%imin%ss') AS date_post FROM posts INNER JOIN users ON posts.id_user = users.id_user ORDER BY posts.date_post DESC; `
