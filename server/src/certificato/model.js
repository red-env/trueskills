const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Certificato",
  new mongoose.Schema(
    {
      data: {
        type: Date,
        default: new Date(),
      },
      titolo: {
        // titolo di studio
        type: String,
        required: true,
      },
      studente: {
        type: String,
        required: true,
      },
      voto: {
        type: Number,
      },
      commento: {
        type: String,
      },
      tx_hash: {
        type: String,
        required: true,
      },
      tx_url: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
