const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Titolo",
  new mongoose.Schema(
    {
      data: {
        type: Date,
        default: new Date(),
      },
      certificati: {
        type: Array,
        default: [],
      },
      segreteria: {
        type: String,
        required: true,
      },
      titolo: {
        type: String,
        required: true,
      },
      descrizione: {
        type: String,
      },
      max_voto: {
        type: Number,
      },
    },
    {
      timestamps: true,
    }
  )
);
