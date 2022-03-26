const f = require("../formatter/response_formatter.js");
const parse = require("./jwt_req_to_data");

module.exports = f((req) => {
    const data = parse(req);
    req.auth = data;
    return undefined;
});
