const bookingModel = require("../../models/booking/booking.model");
const { calculateDistance } = require("../../utils/function")


const createBooking = async (req, res) => {
    try {
        const { riderId, driverId, pickupLocation, dropoffLocation } = req.body;
        if (!riderId || !driverId || !pickupLocation || !dropoffLocation) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const distance = calculateDistance(pickupLocation, dropoffLocation);

        const fare = distance * 5;
        console.log(fare)
        // const newBooking = await bookingModel.create({ rider: riderId, driver: driverId, pickupLocation, dropoffLocation, fare, distance, status: 'Pending', });
        // return res.status(201).json({ message: 'Booking created successfully', booking: newBooking });

    } 
    
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}


module.exports = {createBooking}