const mongoose = require("mongoose");
const tipi = require("../utility/constants/ruoli.json");

module.exports = mongoose.model(
  "Utente",
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
        select: false,
      },
      ruolo_tipo: {
        type: String,
        enum: Object.values(tipi),
        required: true,
      },
      ruolo_id: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
