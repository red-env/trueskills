const jsonwebtoken = require("jsonwebtoken");
const f = require("../formatter/response_formatter.js");
const Exception = require("../exception/exception.js");

module.exports = f((req) => {
  const authorization = req.headers["authorization"];
  if (authorization) {
    const data = jsonwebtoken.verify(
      authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    if (data) {
      req.auth = data;
      return undefined;
    }
  }
  throw new Exception("ACCESSO_NON_AUTORIZZATO", 401);
});
