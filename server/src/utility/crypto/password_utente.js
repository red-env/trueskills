const crypto = require("crypto");

module.exports = (password) => {
  return crypto
    .createHmac("sha256", process.env.CRYPTO_SECRET)
    .update(password)
    .digest("base64");
};
