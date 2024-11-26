const bookingModel = require("../../models/booking/booking.model");
const Notification = require("../../models/rider/notification.model");
const { calculateDistance } = require("../../utils/function")


const createBooking = async (req, res) => {
    try {
        const { riderId, driverId, pickupLocation, dropoffLocation, dropoffAddress,pickUpAddress} = req.body;
        console.log(riderId, driverId, pickupLocation, dropoffLocation)
        if (!riderId || !driverId || !pickupLocation || !dropoffLocation) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const distance = calculateDistance(pickupLocation, dropoffLocation);

        const fare = distance * 5;
        console.log(fare)
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
        // const findBooking = await bookingModel.findById(req.params.id,{status: 'Ongoing',accepted:true })
        // if(findBooking.status=='Ongoing'){
        //     const newBooking = await bookingModel.findByIdAndUpdate(req.params.id,{status: 'Completed',accepted:true },{$new:true});
        //     return res.status(200).json({data: newBooking });
        // }
        // else{
        const newBooking = await bookingModel.findByIdAndUpdate(req.params.id, { status: 'Ongoing', accepted: true },{$new:true});
        await Notification.create({riderId:newBooking.rider,title:"Ride Accepted",description:"You ride request is accepted"})
        await Notification.create({driverId:newBooking.driver,title:"Ride Accepted",description:"You have accepted  ride request"})

        return res.status(200).json({ data: newBooking });
        // }
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}

const endRide = async (req, res) => {
    try {
        const newBooking = await bookingModel.findByIdAndUpdate(req.params.id, { status: 'Completed', accepted: true }, { $new: true });
        await Notification.create({riderId:newBooking.rider,title:"Ride Completed",description:"You ride is completed"})
        await Notification.create({driverId:newBooking.driver,title:"Ride Completed",description:"You ride is completed"})        
        return res.status(200).json({ data: newBooking });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}


const getActiveBooking = async (req, res) => {
    try {
        let type = req.params.type
        console.log(type, 'type')
        if (type == "rider") {
            let activeBooking = await bookingModel.findOne({ rider: req.params.id, status: 'Ongoing', accepted: true }).populate("driver")
            if(activeBooking){
                return res.status(200).json({ data: activeBooking });
            }
            return res.status(200).json({ data: {} });
        }
        else {
            let activeBooking = await bookingModel.findOne({ driver: req.params.id, status: 'Ongoing', accepted: true }).populate("rider")
            return res.status(200).json({ data: activeBooking });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}


const cancellBooking = async (req, res) => {
    try {
        let type = req.params.type
        let activeBooking = await bookingModel.findOne({ rider: req.params.id, status: 'Pending' }).populate("driver")
        if (type == "rider") {
            if(activeBooking){
                const newBooking = await bookingModel.findByIdAndUpdate(activeBooking._id, { status: 'Cancelled', cancelled: true },{$new:true});
                console.log(newBooking,'newBooking')
                await Notification.create({riderId:activeBooking.rider,title:"Ride Cancelled",description:"You have cancelled the ride request"})
                await Notification.create({driverId:activeBooking.driver,title:"Ride Cancelled",description:"Customer have cancelled the ride request"})
                return res.status(200).json({ data: activeBooking });
            }
            return res.status(200).json({ data: {} });
        }
        else {
            const newBooking = await bookingModel.findByIdAndUpdate(activeBooking._id, { status: 'Cancelled', cancelled: true },{$new:true});
            await Notification.create({riderId:activeBooking.rider,title:"Ride Cancelled",description:"Driver have cancelled the ride request"})
            await Notification.create({driverId:activeBooking.driver,title:"Ride Cancelled",description:"You have decline the ride request "})
            return res.status(200).json({ data: activeBooking });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}



module.exports = { createBooking, getBookingForDriver, acceptBooking, getActiveBooking ,endRide,cancellBooking}