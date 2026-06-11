const jwt = require('jsonwebtoken')

async function authMiddlewares(req,res,next){
    const token= req.cookies.token;
    if(!token){
        
    }
}