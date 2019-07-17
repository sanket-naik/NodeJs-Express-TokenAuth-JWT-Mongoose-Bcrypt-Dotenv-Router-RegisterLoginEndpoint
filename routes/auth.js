const router=require('express').Router();
const User=require('../models/User')
const {registerValidation, loginValidation}=require('../validation')
const bcrypt=require('bcryptjs') //used to encrypt the password
const jwt=require('jsonwebtoken') //Token auth


//Register
router.post('/register', async (req,res)=>{  //route will be= api/users/register

    //validate
    const {error}=registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //check if user already in db
    const emailExist= await User.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send("Email already exist")

    //Hash password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password, salt)

    //new user
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })
    try{
        const savedUser=await user.save()
        res.send({Id:user._id})
    }catch(err){
        res.status(400).send("Error...")
    }
})

//Login
router.post('/login', async (req,res)=>{
    //Lets validate the data before bring a user.
    const {error}=loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //check if email dosnt exist 
    const user= await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("Email dosn't exist...")

    //check password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Password is wrong!!!')

    //TOKEN IS BASICALLY TELLS US WE ARE LOGGED IN. EX: YOU ARE POSTING A BLOG POST AND YOU WANT TO CHECK WHETHER YOU ARE LOGEDIN YOU USE TOKEN
    const token=jwt.sign({_id:user._id}, process.env.TOKEN_SECRET) //First param is the info tht u want to send and second is secrate key in .env
    res.header('auth-token',token).send(token);

})

module.exports=router;