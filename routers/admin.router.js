const { createAccount, loginAccount, getAccount } = require("../services/admin/admin.service")

const router = require("express").Router()


router.post("/register",createAccount)
router.post("/login",loginAccount)
router.get("/single/:id",getAccount)




module.exports = router