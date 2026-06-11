const jwt = require('jsonwebtoken')

async function authMiddlewares(req,res,next){
    const token= req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"unauthorize"
        })
    }
    try{
        const decoded=jwt.verify(token,)
    }
}