const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Studente",
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
      },
      telefono: {
        type: String,
        required: true,
      },
      nome: {
        type: String,
        required: true,
      },
      cognome: {
        type: String,
        required: true,
      },
      cf: {
        type: String,
        required: true,
      },
      certificati: {
        type: Array,
        default: [],
      },
    },
    {
      timestamps: true,
    }
  )
);
