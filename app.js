//basic
const express = require("express")
const app = express()
const router=require("./src/route/api")
const bodyParser= require("body-parser")

// security middleware
const rateLimit=require("express-rate-limit")
const helmet = require("helmet")
const seniTize=require("express-mongo-sanitize")
const hpp = require('hpp')
const corse = require("cors")

//database lib import
const mongoose = require("mongoose")


// implement

app.use(corse())
app.use(helmet())
app.use(hpp())
app.use(seniTize())
//body parser
app.use(bodyParser.json())

//limiter
const limit=rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 1000,
})
app.use(limit)

//mongodb connection
let url = "mongodb://localhost:27017/Todo"
let option = {user:"",pass:"",autoIndex:true}

async function db(){
  try {
    await  mongoose.connect(url,option)
    console.log('connection successfully establish')
    
  } catch (error) {
    console.log("failed to connect",error)
    
  }

}
db()
//routing implement
app.use("/api/v1",router)
//undefine route
app.use("*",(req,res)=>{

    res.status(404).json({data:"not found"})
})
module.exports=app


