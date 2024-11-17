const express = require("express")
const cors = require("cors")
const { dbConnection } = require("./database/connection")
const combineRouter = require("./routers")
require("dotenv").config()



const app = express()
const port = process.env.PORT || 3002
app.use(express.json())
app.use(cors({origin:"*",methods: 'GET,POST,PUT,DELETE',}))
dbConnection()


app.use("/api/v1",combineRouter)


app.use("*",()=>{
    console.log('Invalid Api')
})





app.listen(port,()=>{ console.log(`server is running on port ${port}`)})
