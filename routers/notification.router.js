const router = require("express").Router()
const { getNotificationForRider, getNotificationForAdmin, getNotificationForDriver } = require("../services/rider/notification.service");


router.get("/rider/:id",getNotificationForRider)
router.get("/driver/:id",getNotificationForDriver)
router.get("/admin/:id",getNotificationForAdmin)




module.exports = router