const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  rider: { type: Schema.Types.ObjectId, ref: 'riderAccount', required: true },
  driver: { type: Schema.Types.ObjectId, ref: 'driverAccount', required: true },
  pickupLocation: {type: { type: String, default: 'Point' },coordinates: [Number],},
  dropoffLocation: {type: { type: String, default: 'Point' },coordinates: [Number],},
  fare: { type: Number, required: true },
  distance: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  bookingTime: { type: Date, default: Date.now() },
  accepted:{type:Boolean,default:false},
  cancelled:{type:Boolean,default:false},
  dropoffAddress:{type: String, default: ''},
  pickUpAddress:{type: String, default: ''}
});

bookingSchema.index({ pickupLocation: '2dsphere' });
bookingSchema.index({ dropoffLocation: '2dsphere' });

module.exports = mongoose.model('Booking', bookingSchema);
