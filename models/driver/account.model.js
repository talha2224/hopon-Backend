const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  licenseImage: { type: Array, default: null },
  insuranceImage: { type: Array, default: null },
  inspection: { type: Array, default: null },
  carPhotos: { type: Array, required: true },
  location: {type: { type: String, default: "Point" },coordinates: [Number],},
}, { timestamps: true });

// Create the DriverAccount model
const driverAccount = mongoose.model("driverAccount", accountSchema, "driverAccount");

module.exports = driverAccount;
