const mongoose = require("mongoose")
const mongoDB_URL = process.env

exports.connect = ()=>{
    mongoose.connect(mongoDB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()).catch((error)=>{
        console.log("DB connection failed")
        console.log(error)
        process.exit(1)
    })
}
