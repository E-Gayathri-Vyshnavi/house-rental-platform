const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  category: { type: String, enum: ['Apartment', 'Villa', 'PG', 'Hotel', 'House'], required: true },
  imageUrl: { type: String },
  facilities: [String],
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);