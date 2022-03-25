const jsonwebtoken = require("jsonwebtoken");
const f = require("../formatter/response_formatter.js");

module.exports = f((req) => {
  const authorization = req.headers["authorization"];
  if (authorization) {
    const data = jsonwebtoken.verify(
      authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    if (data) return data;
  }
  throw "Non autorizzato";
});
