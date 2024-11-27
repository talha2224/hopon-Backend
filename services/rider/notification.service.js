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


module.exports = {getNotificationForRider,getNotificationForDriver,getNotificationForAdmin}

