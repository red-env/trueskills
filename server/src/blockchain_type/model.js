const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Blockchain_Type",
  new mongoose.Schema(
    {
      nome: {
        type: String,
        required: true,
      },
      url_base: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
