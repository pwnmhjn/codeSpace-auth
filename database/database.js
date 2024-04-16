const mongoose = require("mongoose")
const {MONGODB_URL} = process.env

exports.connect = ()=>{
    mongoose.connect(MONGODB_URL).then(()=>{
        console.log("mongoDB connetion successfull")
    }).catch((error)=>{
        console.log("DB connection failed")
        console.log(error)
        process.exit(1)
    })
}
