const bcrypt = require("bcryptjs")
const { uploadFile } = require("../../utils/function")
const AdminModel = require("../../models/admin/admin.mode")


const createAccount = async(req,res)=>{
    try {
        let {username,email,password} = req.body
        let findAccount = await AdminModel.findOne({email})
        if(findAccount){
            return res.status(201).json({msg:"Account Exits",data:findAccount})
        }
        else{
            let hash = await bcrypt.hash(password,10)
            let create = await AdminModel.create({username,email,password:hash})
            return res.status(201).json({msg:"Account Created",data:create})
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Error",data:null,error:error})
    }
}

const loginAccount = async(req,res)=>{
    try {
        let {email,password} = req.body
        let findAccount = await AdminModel.findOne({email})
        console.log(findAccount)
        if(!findAccount){
            return res.status(404).json({msg:"Account Not Exits",data:null})
        }
        else{
            let isSame = await bcrypt.compare(password,findAccount?.password)
            if(isSame){
                return res.status(200).json({msg:"Login Sucessfull",data:findAccount})
            }
            return res.status(404).json({msg:"Account Not Exits",data:null})
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Error",data:null,error:error})
    }
}

const getAccount = async (req,res)=>{
    try {
        let findAccount = await AdminModel.findById(req.params.id)
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


module.exports = {createAccount,getAccount,loginAccount}