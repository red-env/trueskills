const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Segreteria",
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
      p_iva: {
        type: String,
        required: true,
      },
      titoli: {
        type: Array,
        default: [],
      },
    },
    {
      timestamps: true,
    }
  )
);
