const { multipleupload } = require("../../config/multer.config")
const { createAccount, getAccount, getAccountByPhone, uploadPicture, fetchAllUsers, toogleAccountActivation } = require("../../services/rider/account.service")

const router = require("express").Router()


router.post("/register",createAccount)
router.get("/info/:id",getAccount)
router.get("/phone/:phone",getAccountByPhone)
router.put("/upload/:id",multipleupload.single("image"),uploadPicture)
router.get("/all",fetchAllUsers)
router.post("/toogle-account",toogleAccountActivation)


module.exports = router