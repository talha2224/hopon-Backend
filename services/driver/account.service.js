const driverAccount = require("../../models/driver/account.model")
const { uploadFile } = require("../../utils/function")
const Notification = require("../../models/rider/notification.model")
const Wallet = require("../../models/wallet/wallet.model")

// let licenseImage = req.files.licenseImage && req.files.licenseImage;
// let insuranceImage = req.files.insuranceImage && req.files.insuranceImage;
// let inspection = req.files.inspection && req.files.inspection;

const createAccount = async (req, res) => {
    try {
        let { first_name, last_name, phone_number } = req.body
        let findAccount = await driverAccount.findOne({ phone_number: phone_number })

        let carPhotos = req.files.carPhotos && req.files.carPhotos;
        let output = []

        // Wait for all uploadFile promises to resolve
        if (carPhotos && carPhotos.length > 0) {
            const uploadPromises = carPhotos.map(async (i) => {
                let result = await uploadFile(i)
                console.log(result, 'result')
                return result; // Return the result for Promise.all
            });

            // Wait for all promises to resolve
            output = await Promise.all(uploadPromises);
        }

        console.log(output, 'output')

        if (findAccount) {
            return res.status(201).json({ msg: "Account Exits", data: findAccount })
        }

        let create = await driverAccount.create({ first_name, last_name, phone_number, carPhotos: output })
        return res.status(201).json({ msg: "Account Created", data: create })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error", data: null, error: error })
    }
}

const getAccount = async (req, res) => {
    try {
        let findAccount = await driverAccount.findById(req.params.id)
        if (findAccount) {
            console.log(findAccount,'findAccount')
            return res.status(200).json({ msg: null, data: findAccount })
        }
        else {
            return res.status(404).json({ msg: "Account Not Found" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error", data: null, error: error })
    }
}

const getAccountByPhone = async (req, res) => {
    try {
        let findAccount = await driverAccount.findOne({ phone_number: req.params.phone })
        if (findAccount) {
            return res.status(201).json({ msg: null, data: findAccount })
        }
        else {
            return res.status(404).json({ msg: "Account Not Found" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error", data: null, error: error })
    }
}


const updateLocation = async (req, res) => {
    const { driverId, longitude, latitude, online } = req.body;

    try {
        const updatedDriver = await driverAccount.findByIdAndUpdate(driverId, { $set: { online: online, location: { type: "Point", coordinates: [longitude, latitude] } }, }, { new: true });
        if (!updatedDriver) {
            return res.status(404).json({ message: "Driver not found" });
        }

        res.status(200).json({ message: "Location updated successfully", updatedDriver });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating location", error });
    }
}


const nearbyDrivers = async (req, res) => {
    try {
        const nearbyDrivers = await driverAccount.find({ online: "on" }).limit(10);
        res.status(200).json(nearbyDrivers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching nearby drivers", error });
    }
}


const getDriverLocation = async (req, res) => {
    const { driverId } = req.params;

    try {
        const driver = await driverAccount.findById(driverId);

        if (!driver || !driver.location) {
            return res.status(404).json({ message: "Driver not found or location not available" });
        }

        res.status(200).json({ driverLocation: driver.location });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching driver location", error });
    }
}


const updateBalance = async (req, res) => {
    try {
        let find = await driverAccount.findById(req.params.id)
        let account = await driverAccount.findByIdAndUpdate(req.params.id, { pendingAmount: 0 }, { new: true })
        if (account) {
            await Wallet.create({ driverId: req.params.id, amount: find?.pendingAmount, deposit: false, message: "Payment Sent To Admin" })
            await Notification.create({ driverId: req.params.id, title: "Payment Succesfull", description: `${find?.pendingAmount} $ Sent To Admin` })
            return res.status(200).json({ msg: null, data: account })
        }
        else {
            return res.status(404).json({ msg: "Account Not Found" })
        }
    }
    catch (error) {
        console.log(error)
    }
}

const uploadPicture = async (req, res) => {
    try {
        let { id } = req.params;
        let image = req.file
        console.log(image, 'image')
        let url = await uploadFile(image);
        console.log(url, 'url')
        let updateProfile = await driverAccount.findByIdAndUpdate(id, { profile: url }, { new: true })
        return res.status(200).json({ data: updateProfile, msg: "Profile Picture Updated" })
    }
    catch (error) {
        console.log(error)
    }
}





module.exports = {uploadPicture, createAccount, getAccount, getAccountByPhone, updateLocation, nearbyDrivers, getDriverLocation, updateBalance }