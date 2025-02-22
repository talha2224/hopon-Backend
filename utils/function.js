const { storage } = require("../config/firebase.config");
const { getDownloadURL, ref, uploadBytes } = require("@firebase/storage");
const twilio = require('twilio');
const accountSid = "AC2682d60469fd98cc99440fa6aece21a1";
const authToken = "897ef0d8edfe7d199a72ae8b4d3bdbe7";
const twilioPhoneNumber = "+18559306117";

// Initialize Twilio client
const client = twilio(accountSid, authToken);

const toRad = (value) => (value * Math.PI) / 180;

module.exports = {
    sendOtp: async (phoneNumber, otp) => {
        try {
            const message = await client.messages.create({ body: `Your OTP for hop on account verification is: ${otp}`, from: twilioPhoneNumber, to: phoneNumber, });
            console.log('Message sent:', message.sid);
            return { success: true, sid: message.sid };
        }
        catch (error) {
            console.error('Error sending OTP:', error);
            return { success: false, error: error.message };
        }
    },
    generatePin: () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    },
    uploadFile: (async (file) => {
        const uniqueFilename = `${file.originalname}-${Date.now()}`;
        const storageRef = ref(storage, `${uniqueFilename}`);
        await uploadBytes(storageRef, file.buffer);
        const result = await getDownloadURL(storageRef);
        let downloadUrl = result;
        return downloadUrl
    }),
    calculateDistance: (pickup, dropoff) => {
        const lat1 = pickup.coordinates[1];
        const lon1 = pickup.coordinates[0];
        const lat2 = dropoff.coordinates[1];
        const lon2 = dropoff.coordinates[0];

        const R = 6371; // Earth's radius in km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceKm = R * c;

        const distanceMiles = distanceKm * 0.621371; // Convert km to miles
        return distanceMiles;
    },


}