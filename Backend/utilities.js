

const jwt =require('jsonwebtoken')

require('dotenv').config();
function authenticateToken(req,res,next) {
     
    const authHeader= req.headers["authorization"];
    const token =authHeader && authHeader.split(" ")[1];

    if(!token) 
        return res.status(401).json({
        success:false,
            message:'token is missing'
    })

    jwt.verify(token ,process.env.ACCESS_TOKEN_SECRET ,(err,user )=>{
        if(err) {
            return res.status(401).json({
                success:false,
                message:'error in token'
            })
        }
        req.user =user;
        next();
    })

}

module.exports ={
    authenticateToken,
}