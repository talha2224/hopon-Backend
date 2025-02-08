const { dashboardData } = require("../services/dashboard.sevice")

const router = require("express").Router()
router.get("/data",dashboardData)





module.exports = router