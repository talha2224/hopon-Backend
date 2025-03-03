const riderAccount = require("../../models/rider/account.model")
const driverAccount = require("../../models/driver/account.model")
const { uploadFile } = require("../../utils/function")


const createAccount = async(req,res)=>{
    try {
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
        if(findAccount?.accountBlocked){
            return res.status(404).json({msg:"Account Not Found"})
        }
        else if(findAccount){
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

const uploadPicture = async (req,res)=>{
    try {
        let { id } = req.params;
        let image = req.file
        console.log(image,'image')
        let url = await uploadFile(image);
        console.log(url,'url')
        let updateProfile = await riderAccount.findByIdAndUpdate(id,{profile:url},{new:true})
        return res.status(200).json({data:updateProfile,msg:"Profile Picture Updated"})
    } 
    catch (error) {
        console.log(error)
    }
}


const fetchAllUsers = async (req,res) =>{
    try {
        console.log('ENNTER')
        let riders = await riderAccount.find().sort({createdAt:-1})
        let drivers = await driverAccount.find().sort({createdAt:-1})
        return res.status(200).json({data:[...riders,...drivers]})

    } 
    catch (error) {
        
    }
}

const toogleAccountActivation = async (req, res) => {
    try {
        let { accountId, toogle, role } = req.body
        console.log(accountId, toogle, role,' accountId, toogle, role')
        if(role=="rider"){
            let toogleAccount = await riderAccount.findByIdAndUpdate(accountId, { accountBlocked: Boolean(toogle) }, { new: true })
            console.log(toogleAccount,'toogleAccount rider')
            return res.status(200).json({ data: toogleAccount, msg: `Account ${Boolean(toogle) ? "Deactivated" : "Activated"} ` })
        }
        else{
            let toogleAccount = await driverAccount.findByIdAndUpdate(accountId, { accountBlocked: Boolean(toogle) }, { new: true })
            console.log(toogleAccount,'toogleAccount driver')
            return res.status(200).json({ data: toogleAccount, msg: `Account ${Boolean(toogle) ? "Deactivated" : "Activated"} ` })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ data: null, msg: error })
    }
}

module.exports = {createAccount,getAccount,getAccountByPhone,uploadPicture,fetchAllUsers,toogleAccountActivation}