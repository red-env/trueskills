const parse = require("./jwt_req_to_data");
const f = require("../formatter/response_formatter.js");
const Exception = require("../exception/exception.js");

module.exports = f((req) => {
  const data = parse(req);
  if(data)
    return undefined;
  throw Exception.ACCESSO_NON_AUTORIZZATO;
});
