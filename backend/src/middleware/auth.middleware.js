const jwt = require('jsonwebtoken')

function isAuth(req, res, next){
    let token = null;
    const authHeader = req.headers.authorization;

    //* Ottieni accessToken
    if(authHeader && authHeader.startsWith('Bearer')){
        return token = authHeader.split(" ")[1];
    }
    if(!token){
        return res.status(401).json({message: 'Access Token mancante.'});
    }

    //* Decodifica e verifica accessToken
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.userId = { id: decoded.userId };
        next();
        
    } catch (err) {
        return res.status(401).json({ message: 'Access Token non valido.' });
    }
} 

module.exports = {
    isAuth
}
