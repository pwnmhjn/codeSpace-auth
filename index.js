const app = require("./app")
const {PORT} = process.env

app.listen(PORT,(req,res)=>{
console.log(`sever is running at port ${PORT}`)
})