const driverAccount = require("../../models/driver/account.model")
const bcrypt = require("bcryptjs")
const { uploadFile } = require("../../utils/function")


const createAccount = async(req,res)=>{
    try {
        console.log('hhhhhhhhhhh')
        let {first_name,last_name,phone_number} = req.body
        let findAccount = await driverAccount.findOne({phone_number:phone_number})

        let carPhotos = req.files.carPhotos && req.files.carPhotos;
        let output = []
        carPhotos.map(async(i)=>{
            let result = await uploadFile(i)
            console.log(result,'result')
            output.push(result)
        })
        // let licenseImage = req.files.licenseImage && req.files.licenseImage;
        // let insuranceImage = req.files.insuranceImage && req.files.insuranceImage;
        // let inspection = req.files.inspection && req.files.inspection;

        console.log(carPhotos,'carPhotos')


        if(findAccount){
            return res.status(201).json({msg:"Account Exits",data:findAccount})
        }
        else{
            let create = await driverAccount.create({first_name,last_name,phone_number,carPhotos:output})
            return res.status(201).json({msg:"Account Created",data:create})
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Error",data:null,error:error})
    }
}

const getAccount = async (req,res)=>{
    try {
        let findAccount = await driverAccount.findById(req.params.id)
        if(findAccount){
            return res.status(201).json({msg:null,data:findAccount})
        }
        else{
            return res.status(404).json({msg:"Account Not Found"})
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Error",data:null,error:error})
    }
}

const getAccountByPhone = async (req,res)=>{
    try {
        let findAccount = await driverAccount.findOne({phone_number:req.params.phone})
        console.log(findAccount,'findAccount')
        if(findAccount){
            return res.status(201).json({msg:null,data:findAccount})
        }
        else{
            return res.status(404).json({msg:"Account Not Found"})
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Error",data:null,error:error})
    }
}



module.exports = {createAccount,getAccount,getAccountByPhone}