const jwt = require('jsonwebtoken');
require('dotenv').config();

//création du middleware pour sécurisé les routes de l api

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        const id_user = decodedToken.id_user
        if(parseInt(req.body.id_user) && parseInt(req.body.id_user) !== id_user ){
            throw 'id_user non valide ! '  
        } else {  
            next()
        }
    }catch (error) {
        res.status(401).json({ error: error , message: 'Requête non authentifiée !'});   
    } 
};