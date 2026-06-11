const jwt = require('jsonwebtoken')

async function authMiddlewares(req,res,next){
    const token= req.cookies.token;
    if(!token){
        return res.status(400).json({
            message
        })
    }
}