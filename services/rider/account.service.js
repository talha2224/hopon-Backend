const riderAccount = require("../../models/rider/account.model")
const bcrypt = require("bcryptjs")


const createAccount = async(req,res)=>{
    try {
        console.log('ENTER')
        let {first_name,last_name,phone_number,prefference} = req.body
        let findAccount = await riderAccount.findOne({phone_number:phone_number})
        if(findAccount){
            return res.status(201).json({msg:"Account Exits",data:findAccount})
        }
        else{
            let create = await riderAccount.create({first_name,last_name,phone_number,prefference})
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
        let findAccount = await riderAccount.findById(req.params.id)
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
        let accountsss = await riderAccount.find({})
        console.log(accountsss)
        let findAccount = await riderAccount.findOne({phone_number:req.params.phone})
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