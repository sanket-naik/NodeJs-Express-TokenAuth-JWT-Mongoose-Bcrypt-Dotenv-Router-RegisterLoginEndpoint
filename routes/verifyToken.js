//Creating a privater router which verify token exist or not
const jwt=require('jsonwebtoken') 

module.exports = function(req,res,next){   //creating middleware req,res,next
    const token=req.header('auth-token')
    if(!token) return res.status(401).send('Access-Denied'); //Check whether it has a token or not

    try{
        const verified=jwt.verify(token, process.env.TOKEN_SECRET);  //If exist check if token is valid token
        req.user=verified; //We get req.user in all of our code
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}