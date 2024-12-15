const SavedPlace = require("../../models/rider/places.model")

const getAllSavedPlaces = async (req, res) => {
    try {
        const riderId = req.params.id;
        let savedPlaces = await SavedPlace.find({ riderId: riderId });
        return res.status(200).json({ status: 200, data: savedPlaces });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error fetching saved places", status: 500 });
    }
};

const savePlace = async (req, res) => {
    try {
        const { title, description, riderId } = req.body;
        const newSavedPlace = new SavedPlace({ title, description, riderId });
        await newSavedPlace.save();
        return res.status(200).json({ msg: "Place saved successfully", status: 200, data: newSavedPlace });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error saving place", status: 500 });
    }
};

module.exports = { getAllSavedPlaces, savePlace };
