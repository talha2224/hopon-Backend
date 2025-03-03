const PriceModel = require("../../models/admin/price.model");
const bookingModel = require("../../models/booking/booking.model");
const driverAccount = require("../../models/driver/account.model");
const Notification = require("../../models/rider/notification.model");
const Wallet = require("../../models/wallet/wallet.model")

const { calculateDistance } = require("../../utils/function")


const createBooking = async (req, res) => {
    try {
        const { riderId, driverId, pickupLocation, dropoffLocation, dropoffAddress,pickUpAddress} = req.body;
        if (!riderId || !driverId || !pickupLocation || !dropoffLocation) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const distance = calculateDistance(pickupLocation, dropoffLocation);
        let price = await PriceModel.find({})
        const fare = distance * price[0]?.perKmPrice || 5;
        const newBooking = await bookingModel.create({ rider: riderId, driver: driverId, pickupLocation, dropoffLocation, fare, distance, status: 'Pending', dropoffAddress,pickUpAddress });
        await Notification.create({riderId,title:"New Ride Request",description:"You have open a new ride request"})
        await Notification.create({driverId,title:"New Ride Request",description:"You have recieve a new ride request"})
        global.io.to(driverId).emit('newRide', newBooking);
        return res.status(201).json({ message: 'Booking created successfully', booking: newBooking });

    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}


const getBookingForDriver = async (req, res) => {
    try {
        const newBooking = await bookingModel.findOne({ driver: req.params.id, status: 'Pending', accepted: false }).populate("rider")
        return res.status(200).json({ data: newBooking });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}

const acceptBooking = async (req, res) => {
    try {
        const newBooking = await bookingModel.findByIdAndUpdate(req.params.id, { status: 'Ongoing', accepted: true },{$new:true});
        await Notification.create({riderId:newBooking.rider,title:"Ride Accepted",description:"You ride request is accepted"})
        await Notification.create({driverId:newBooking.driver,title:"Ride Accepted",description:"You have accepted  ride request"})
        return res.status(200).json({ data: newBooking });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}

const endRide = async (req, res) => {
    try {
        const newBooking = await bookingModel.findByIdAndUpdate(req.params.id, {accepted: true,status:"Completed" }, { $new: true });
        let taxData = await PriceModel.find({});
        let taxPercentage = taxData[0]?.deductCharges || 5;
        let fareAmount = newBooking?.fare * (taxPercentage / 100);
        await Wallet.create({riderId:newBooking.rider,amount:newBooking?.fare,deposit:false,message:"Ride Payment Sent"})
        await Wallet.create({driverId:newBooking.driver,amount:newBooking?.fare,deposit:true,message:"Ride Payment Recieved"})
        await driverAccount.findByIdAndUpdate(newBooking.driver,{pendingAmount:fareAmount})        
        await Notification.create({riderId:newBooking.rider,title:"Ride Completed",description:"You ride is completed"})
        await Notification.create({driverId:newBooking.driver,title:"Ride Completed",description:"You ride is completed"})  
      
        return res.status(200).json({ data: newBooking });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}

const cancellBooking = async (req, res) => {
    try {
        let type = req.params.type
        if (type == "rider") {
            let activeBooking = await bookingModel.findOne({ rider: req.params.id, status: 'Pending' })
            if(activeBooking){
                const newBooking = await bookingModel.findByIdAndUpdate(activeBooking._id, { status: 'Cancelled', cancelled: true },{new:true});
                await Notification.create({riderId:activeBooking.rider,title:"Ride Cancelled",description:"You have cancelled the ride request"})
                await Notification.create({driverId:activeBooking.driver,title:"Ride Cancelled",description:"Customer have cancelled the ride request"})
                console.log(activeBooking.driver,'activeBooking.driver')
                global.io.emit('cancelRide', newBooking);
                return res.status(200).json({ data: activeBooking });
            }
            return res.status(200).json({ data: {} });
        }
        else {
            let activeBooking = await bookingModel.findOne({ driver: req.params.id, status: 'Pending' })
            if(activeBooking){
                const newBooking = await bookingModel.findByIdAndUpdate(activeBooking._id, { status: 'Cancelled', cancelled: true },{$new:true});
                await Notification.create({riderId:activeBooking.rider,title:"Ride Cancelled",description:"Driver have cancelled the ride request"})
                await Notification.create({driverId:activeBooking.driver,title:"Ride Cancelled",description:"You have decline the ride request "})
                global.io.emit('cancelRide', newBooking);
                return res.status(200).json({ data: activeBooking });
            }
            return res.status(200).json({ data: {} });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}

const getActiveBooking = async (req, res) => {
    try {
        let type = req.params.type
        if (type == "rider") {
            let activeBooking = await bookingModel.findOne({ rider: req.params.id, status: 'Ongoing', accepted: true }).populate("driver")
            if(activeBooking){
                return res.status(200).json({ data: activeBooking });
            }
            return res.status(200).json({ data: {} });
        }
        else {
            let activeBooking = await bookingModel.findOne({ driver: req.params.id, status: 'Ongoing', accepted: true }).populate("rider")
            if(activeBooking){
                return res.status(200).json({ data: activeBooking });
            }
            return res.status(200).json({ data: {} });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}


const getCancelledBooking = async (req, res) => {
    try {
        let type = req.params.type
        if (type == "rider") {
            let activeBooking = await bookingModel.find({ rider: req.params.id, status: 'Cancelled' }).populate("driver")
            if(activeBooking){
                return res.status(200).json({ data: activeBooking });
            }
            return res.status(200).json({ data: {} });
        }
        else {
            let activeBooking = await bookingModel.find({ driver: req.params.id, status: 'Cancelled'}).populate("rider")
            return res.status(200).json({ data: activeBooking });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}


const getCompletedBooking = async (req, res) => {
    try {
        let type = req.params.type
        console.log(type, 'type')
        if (type == "rider") {
            let activeBooking = await bookingModel.find({ rider: req.params.id, status: 'Completed' }).populate("driver")
            if(activeBooking){
                return res.status(200).json({ data: activeBooking });
            }
            return res.status(200).json({ data: {} });
        }
        else {
            let activeBooking = await bookingModel.find({ driver: req.params.id, status: 'Completed'}).populate("rider")
            return res.status(200).json({ data: activeBooking });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}


const getBookingById = async (req, res) => {
    try {
        const newBooking = await bookingModel.findOne({rider: req.params.id}).sort({ updatedAt: -1 }).populate("rider").populate("driver")
        return res.status(200).json({ data: newBooking });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}


const getAllBookings = async (req,res) =>{
    try {
        let data = await bookingModel.find({}).populate("rider").populate("driver")
        return res.status(200).json({data:data})
    } 
    catch (error) {
        console.log(error)
    }
}




module.exports = {getAllBookings, createBooking, getBookingForDriver, acceptBooking, getActiveBooking ,endRide,cancellBooking,getCancelledBooking,getCompletedBooking,getBookingById}