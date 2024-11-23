const bookingModel = require("../../models/booking/booking.model");
const { calculateDistance } = require("../../utils/function")


const createBooking = async (req, res) => {
    try {
        const { riderId, driverId, pickupLocation, dropoffLocation,dropoffAddress } = req.body;
        console.log(riderId, driverId, pickupLocation, dropoffLocation)
        if (!riderId || !driverId || !pickupLocation || !dropoffLocation) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const distance = calculateDistance(pickupLocation, dropoffLocation);

        const fare = distance * 5;
        console.log(fare)
        const newBooking = await bookingModel.create({ rider: riderId, driver: driverId, pickupLocation, dropoffLocation, fare, distance, status: 'Pending',dropoffAddress });
        return res.status(201).json({ message: 'Booking created successfully', booking: newBooking });

    } 
    
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}


const getBookingForDriver = async (req, res) => {
    try {
        console.log(req.params.id,'req.params.id')
        const newBooking = await bookingModel.findOne({driver:req.params.id,status: 'Pending',accepted:false }).populate("rider")
        return res.status(200).json({data: newBooking });
    } 
    
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}

const acceptBooking= async (req, res) => {
    try {
        const newBooking = await bookingModel.findByIdAndUpdate(req.params.id,{driver: req.params.id,status: 'Ongoing',accepted:true });
        return res.status(200).json({data: newBooking });
    } 
    
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}



module.exports = {createBooking,getBookingForDriver,acceptBooking}