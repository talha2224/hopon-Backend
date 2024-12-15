const { multipleupload } = require("../../config/multer.config")
const { createAccount, getAccount, getAccountByPhone, updateLocation, nearbyDrivers, getDriverLocation, updateBalance, uploadPicture } = require("../../services/driver/account.service")

const router = require("express").Router()


router.post("/register",multipleupload.fields([{ name: 'licenseImage', maxCount: 3 },{ name: 'carPhotos', maxCount: 3 },{ name: 'insuranceImage', maxCount: 3 },{ name: 'inspection', maxCount: 3 }]),createAccount)
router.get("/info/:id",getAccount)
router.get("/phone/:phone",getAccountByPhone)
router.post("/update/location",updateLocation)
router.post("/near-by",nearbyDrivers)
router.get("/get-location/:driverId",getDriverLocation)
router.put("/update/balance/:id",updateBalance)
router.put("/upload/:id",multipleupload.single("image"),uploadPicture)





module.exports = router