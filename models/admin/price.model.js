const mongoose = require("mongoose")



const priceSchema = mongoose.Schema({
    perKmPrice:{type:Number,default:5},
    deductCharges:{type:Number,default:5}
},{timestamps:true})



const PriceModel = mongoose.model('Price',priceSchema,'Price')

module.exports = PriceModel