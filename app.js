require('dotenv').config()
require('./database/database').connect()
const express = require("express")
const User = require("./model/user")
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")
const app = express()


app.use(express.json())

app.get("/",(req,res)=>{
    res.send("<h1>server is working</h1>")
})

app.post("/register",async (req,res)=>{
try {
    //get all data from body
    const {firstname,lastname,email,password} = req.body
    //all the data should exists
    if(!(firstname&&lastname&&email&&password)){
res.status(400).send("validation Error")
    }
//check if user already exists - email
const existingUser =  await User.findOne({email})
if(existingUser){
    res.status(400).send("User already Exist with this emails")
}
//encrypt the passwordd
const EncyptPass = await bcrypt.hash(password,10)
//saved the user in DB
const user = await User.create({firstname,
    lastname,
    email,
    password:EncyptPass})
//generate a token for user and send it
const token = JWT.sign(
    {
        id:user._id,
        email,},
        "shhhh", //process.env.jwtsecret,
        {
            expiresIn:"2h"
        }
    
)
user.token = token
user.password = undefined

res.status(201).json(user)
    
} catch (error) {
    console.log(error)
}
})


app.post("/login",async(req,res)=>{
    
    try {
        //get all data form frontend
        const {email,password}  = req.body
        //validation
        if(!(email&&password)){
            res.status(401).send("field are missing")
        }
        //find user in DB
        const user = await User.findOne({email})
        //if user is not there
        // if(!user){
        //     res.status(400).send("user doest exists")
        // }
        //match the password
        // 
        if(user && (await bcrypt.compare(password,user.password)) ){
          const token =   JWT.sign(
                {id:user._id},
                "shhhh", //process.env.jwtsecret,
                {
                    expiresIn:"2h"
                }
            )
            user.token = token
            user.password = undefined
            
        }
        //send a token
    } catch (error) {
        
    }
})
module.exports = app