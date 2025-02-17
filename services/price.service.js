const PriceModel = require("../models/admin/price.model")



const getPrice = async(req,res)=>{
    try {
        let data = await PriceModel.find({})
        return res.status(200).json({msg:null,data})
    } 
    catch (error) {
        
    }
}


const updatePrice = async (req,res)=>{
    try {
        let all = await PriceModel.find({})
        let data = await PriceModel.findByIdAndUpdate(all[0]?._id,req.body,{new:true})
        return res.status(200).json({msg:null,data})

    } 
    catch (error) {
        console.log(error)
    }
}

const createPrice = async (req,res)=>{
    try {
        let data = await PriceModel.create(req.body)
        return res.status(200).json({msg:null,data})

    } 
    catch (error) {
        console.log(error)
    }
}



module.exports = {getPrice,updatePrice,createPrice}

