const Notification= require("../../models/rider/notification.model")



const getNotificationForRider = async(req,res)=>{
    try {
        let data = await Notification.find({riderId:req.params.id}).sort({ updatedAt: -1 }).populate("riderId")
        return res.status(200).json({msg:null,data})
    } 
    catch (error) {
        
    }
}

const getNotificationForDriver = async(req,res)=>{
    try {
        let data = await Notification.find({driverId:req.params.id}).sort({ updatedAt: -1 }).populate("driverId")
        return res.status(200).json({msg:null,data})
    } 
    catch (error) {
        
    }
}


const getNotificationForAdmin = async(req,res)=>{
    try {
        let data = await Notification.find({}).populate("driverId").populate("riderId")
        return res.status(200).json({msg:null,data})
    } 
    catch (error) {
        
    }
}


const createNotification = async (req,res)=>{
    try {
        console.log(req?.body,'req?.body')
        let {title,description,role,userId} = req.body
        if(role=="rider"){
            let data = await Notification.create({title,description,role,riderId:userId})
            return res.status(200).json({msg:null,data})
        }
        else{
            let data = await Notification.create({title,description,role,driverId:userId})
            return res.status(200).json({msg:null,data})
        }
    } 
    catch (error) {
        console.log(error)
    }
}


module.exports = {getNotificationForRider,getNotificationForDriver,getNotificationForAdmin,createNotification}

