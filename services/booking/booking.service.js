const bookingModel = require("../../models/booking/booking.model");
const { io } = require("../../server");
// const { io } = require("../../server");
const { calculateDistance } = require("../../utils/function")


const createBooking = async (req, res) => {
    try {
        const { riderId, driverId, pickupLocation, dropoffLocation, dropoffAddress } = req.body;
        console.log(riderId, driverId, pickupLocation, dropoffLocation)
        if (!riderId || !driverId || !pickupLocation || !dropoffLocation) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const distance = calculateDistance(pickupLocation, dropoffLocation);

        const fare = distance * 5;
        console.log(fare)
        const newBooking = await bookingModel.create({ rider: riderId, driver: driverId, pickupLocation, dropoffLocation, fare, distance, status: 'Pending', dropoffAddress });
        console.log(driverId, 'driverId')
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
        const newBooking = await bookingModel.findByIdAndUpdate(req.params.id, { status: 'Ongoing', accepted: true });
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
        console.log(newBooking,'newBooking')
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
            return res.status(200).json({ data: activeBooking });
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



module.exports = { createBooking, getBookingForDriver, acceptBooking, getActiveBooking ,endRide}