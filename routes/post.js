const router=require('express').Router();
const verify=require('./verifyToken')

router.get('/', verify, (req,res)=>{  //add verify in place of middleware
    res.json({
        posts:{
            title:'my first post',
            description:'rendom data you shouldnt access!!!'
        }
    })
    // res.send(req.user)

})

module.exports=router;