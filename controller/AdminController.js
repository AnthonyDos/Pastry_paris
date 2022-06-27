const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const connection = require('../config/sql/db.config');
const httpRequestMessages = require('../httpRequestMessages/HttpRequestMessagesAdmin');
const admin = require('../service/AdminService');
const {REGEX_EMAIL, REGEX_PASSWORD } =require('../config/Regex');

exports.createAdmin = async (req,res)=>{
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const password = req.body.password
    const password_regex = REGEX_PASSWORD 
    id_admin = req.body.id_admin

    if(password.match(password_regex)){
        res.status(200).json
    }else{
        res.status(400).json({message: httpRequestMessages.errorRegexPassword})
    }

    if(!REGEX_EMAIL.test(req.body.email)){
        return res.status(400).json({message: httpRequestMessages.errorRegexEmail})
    }

    if(req.body.email){
        connection.query(admin.getAdminByEmail,[req.body.email],(error,result)=>{
            if(error){
                res.status(401).json({error: error})
            }else{
                if (result[0] != undefined) {
                    res.status(401).json({error: error, message: httpRequestMessages.errorEmailConnection})
                }else{
                    const {nom, email} = req.body
                    connection.query(admin.createAdmin,[nom, encryptedPassword, email],(error,result)=>{
                        if(error){
                            res.status(400).json({error: error, message: httpRequestMessages.errorEmailConnection})
                        }else{
                            let comparePassword = bcrypt.hash(req.body.password, 10 )    
                            if (comparePassword){
                                return res.status(200).json({
                                    email: req.body.email,
                                    id_admin: req.params.id_admin,                                 
                                    token: jwt.sign({ id_user: req.params.id_admin},
                                        process.env.JWT_TOKEN,
                                        { expiresIn: '12h' }),
                                        "success": httpRequestMessages.successCreateAdmin
                                })      
                            }else{
                                res.status(401).json({error: error, message: httpRequestMessages})
                            } 
                        }
                    })
                }
            }
        })
    }
}

exports.connectAdmin = (req, res)=>{
    const password = req.body.password
    const password_regex = REGEX_PASSWORD 
    id_admin = req.body.id_admin

    if(password.match(password_regex)){
        res.status(201).json        
    }else{ 
        return res.status(400).json({ message : httpRequestMessages.errorRegexPassword});
    };

    let regexEmail = REGEX_EMAIL  
    if(!regexEmail.test(req.body.email)){    
        return res.json({ message: httpRequestMessages.errorRegexEmail}) 
    }
    connection.query(admin.getAdminByEmail ,[req.body.email], async function(error, results, fields){
        if (error){
            res.status(401).json({error: error ,message: httpRequestMessages.errorChampsEmail})
        }else{
            if (results.length > 0){
                const comparePassword = await bcrypt.compare(password, results[0].password)
                if(comparePassword){
                    res.status(201).json({                     
                        id_admin: results[0].id_admin,
                        isAdmin: results[0].isAdmin,
                        result: results[0],                  
                            token: jwt.sign (
                            {id_admin: results[0].id_admin},                              
                            process.env.JWT_TOKEN,
                            { expiresIn: '24h' } 
                        ),                                                 
                        "success":  httpRequestMessages.successConnectAdmin             
                    })     
                }else { 
                    res.status(401).json({error: error, message: httpRequestMessages.errorConnectionAdmin})
                }
            }else{
                res.status(401).json({error : error ,message: httpRequestMessages.errorEmailNotExist})
            }
        }
    })
}

exports.getAllAdmin = (req, res)=>{
    connection.query(admin.getAllAdmin,(error,result)=>{
        if(error){
            res.status(401).json({error: error, message: httpRequestMessages.errorGetAllAdmin})
        }else{
            res.status(200).json({result: result, message: httpRequestMessages.successGetAllAdmin})
        }
    })
}

exports.getAdminById = (req, res)=>{
    const id_admin = req.params.id_admin 
    connection.query(admin.getAdminById,[id_admin],(error,result)=>{
        if(result[0] === undefined){
            res.status(401).json({error: error, message: httpRequestMessages.errorGetAdminById})
        }else{
           res.status(200).json({result: result, message : httpRequestMessages.successGetAdminById})
        }
    })
}

exports.updateAdmin = async (req, res)=>{
    const encryptedPassword =   await  bcrypt.hash(req.body.password, 10);
    const {nom,password, email} = req.body;
    connection.query(admin.getAdminById,[req.params.id_admin],(error,result)=>{
        const recuperationPassword = result[0].password
        const recuperationEmail = result[0].email
        if (error) {
            res.status(400).json({error: error, message: httpRequestMessages})
        }else{
            if (req.body.password === null || req.body.password === " " ) {
                connection.query(admin.updateAdminById,[nom,recuperationPassword,email, req.params.id_admin],(error,result)=>{
                    if(error){
                        res.status(400).json({error: error, message: httpRequestMessages.errorUpdateAdmin})
                    }else{
                        res.status(201).json({result: result, message: httpRequestMessages.successUpdateAdmin})
                    }
                })
            }else if(email === null || email === "" ){
                connection.query(admin.updateAdminById,[nom,encryptedPassword,recuperationEmail,req.params.id_admin],(error,result)=>{
                    if (error) {
                        res.status(400).json({error: error, message: httpRequestMessages.errorUpdateAdmin})
                    }else{
                        res.status(201).json({result: result, message: httpRequestMessages.successUpdateAdmin})
                    }
                })
            }else{
                if(password.match(REGEX_PASSWORD)){
                    connection.query(admin.updateAdminById,[nom, encryptedPassword, email, req.params.id_admin],(error,result)=>{
                        if (error) {
                            res.status(400).json({error: error, message: httpRequestMessages.errorUpdateAdmin})
                        }else{ 
                            res.status(201).json({result: result, message: httpRequestMessages.successUpdateAdmin})
                        }
                    })
                }else{
                   res.status(400).json({message: httpRequestMessages.errorRegexPassword})
                }
            }
        }
    })
}

exports.deleteAdmin = (req, res)=>{
    const id_admin = req.params.id_admin
    connection.query(admin.deleteAdminById,[id_admin],(error,result)=>{
        if(result.affectedRows > 0){
            res.status(200).json({result: result, message: httpRequestMessages.successDeleteAdmin})
        }else{
            res.status(400).json({error:error, message: httpRequestMessages.errorDeleteAdmin})
        }
    })
}