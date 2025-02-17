const router = require("express").Router()
const { createPrice, getPrice, updatePrice } = require("../services/price.service");

router.post("/create",createPrice)
router.get("/all",getPrice)
router.post("/update",updatePrice)



module.exports = router