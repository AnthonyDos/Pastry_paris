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
