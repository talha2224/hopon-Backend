const WalletModel = require("../../models/wallet/wallet.model");





const getWalletHistory = async (req, res) => {
    try {
        let { type, id } = req.params
        console.log(type, id)
        if (type == "rider") {
            let history = await WalletModel.find({ riderId: id }).sort({ updatedAt: -1 })
            return res.status(200).json({ data: history })
        }
        else {
            let history = await WalletModel.find({ driverId: id }).sort({ updatedAt: -1 })
            console.log(history, 'history')
            return res.status(200).json({ data: history })
        }
    }
    catch (error) {
        console.log(error)
    }
}

const getAllWalletHistory = async (req, res) => {
    try {
        let history = await WalletModel.find().populate("driverId").populate("riderId")
        return res.status(200).json({ data: history })
    }
    catch (error) {
        console.log(error)
    }
}



module.exports = { getWalletHistory, getAllWalletHistory }