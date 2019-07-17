const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv') //it makes our url to mongodb secure. npm install .env
dotenv.config(); 

//Import route
const authRoute=require('./routes/auth') 
const postRoute=require('./routes/post')

//enviroment port or 3000
const port= process.env.PORT || 3000

//connect to db
mongoose.connect(process.env.DB_CONNECT,   //process .env.db_connect lets us to use the url string fro.env securly
{ useNewUrlParser: true },
    ()=>console.log("connect to db")
);

//Middleware to parse data to json
app.use(express.json())

//route middleware
app.use('/api/users',authRoute)
app.use('/api/posts',postRoute)

//Creating a server
app.listen(port,()=>console.log(`port running at ${port}...`))