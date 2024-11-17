const { multipleupload } = require("../../config/multer.config")
const { createAccount, getAccount, getAccountByPhone } = require("../../services/driver/account.service")

const router = require("express").Router()


router.post("/register",multipleupload.fields([{ name: 'licenseImage', maxCount: 3 },{ name: 'carPhotos', maxCount: 3 },{ name: 'insuranceImage', maxCount: 3 },{ name: 'inspection', maxCount: 3 }]),createAccount)
router.get("/info/:id",getAccount)
router.get("/phone/:phone",getAccountByPhone)




module.exports = router