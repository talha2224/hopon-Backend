const { getAllSavedPlaces, savePlace } = require("../../services/rider/places.service")

const router = require("express").Router()


router.post("/create",savePlace)
router.get("/rider/:id",getAllSavedPlaces)



module.exports = router