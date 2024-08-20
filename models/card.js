const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  personName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String },
  businessHours: { type: String },
  promotions: { type: String },
  socialLinks: {
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String }
  },
  images: { type: [String] },
  footer: { type: String },
}, { _id: true });  // Asegúrate de que _id se genera automáticamente

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
