const mongoose = require("mongoose")



const chatSchema = mongoose.Schema({
    driverId:{type:mongoose.Schema.Types.ObjectId,ref:"driverAccount"},
    riderId:{type:mongoose.Schema.Types.ObjectId,ref:"riderAccount"}
})



const Chat = mongoose.model('Chat',chatSchema,'Chat')

module.exports = Chat