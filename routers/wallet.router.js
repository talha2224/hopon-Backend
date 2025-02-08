const router = require("express").Router()
const { getWalletHistory, getAllWalletHistory } = require("../services/wallet/wallet.service");





router.get("/history/:type/:id",getWalletHistory)
router.get("/all",getAllWalletHistory)

module.exports = router