// models/SavedPlace.js
const mongoose = require('mongoose');

const SavedPlaceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    riderId: { type: mongoose.Schema.Types.ObjectId,ref:"riderAccount", required: true }
}, { timestamps: true });

const SavedPlace = mongoose.model('SavedPlace', SavedPlaceSchema);

module.exports = SavedPlace;
