const router = require("express").Router()
const { getWalletHistory } = require("../services/wallet/wallet.service");





router.get("/history/:type/:id",getWalletHistory)


module.exports = router