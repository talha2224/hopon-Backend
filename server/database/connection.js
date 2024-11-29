const mongoose = require("mongoose")
require("dotenv").config()

const dbConnection = async()=>{
    let connection = await mongoose.connect(process.env.DBURL)
    if(connection){
        return console.log("Database connected")
    }
    else{
        return console.log("Database not connected")
    }
}


module.exports =  {dbConnection}