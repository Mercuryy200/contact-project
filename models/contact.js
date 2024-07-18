const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  entreprise: {
    type: String,
  },
  telephone: {
    type: String,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
  adresse: {
    type: String,
  },
  relation: {
    type: String,
  },
});
module.exports = mongoose.model("contact", contactSchema);
