const jsonwebtoken = require("jsonwebtoken");

module.exports = (req) => {
  const authorization = req.headers["authorization"];
  if (authorization) {
    return jsonwebtoken.verify(
      authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
  }
  return null;
};
