const crypto = require("crypto");

module.exports = function encrypt_password(password) {
  return crypto
    .createHmac("sha256", process.env.CRYPTO_SECRET)
    .update(password)
    .digest("base64");
};
