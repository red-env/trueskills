
const jsonwebtoken = require("jsonwebtoken");
const f = require("../formatter/response_formatter.js");
const Exception = require("../exception/exception.js");

module.exports = (ruolo) => f((req) => {
    if (req.auth.utente.ruolo_tipo === ruolo) return undefined;
    throw Exception.RUOLO_NON_AUTORIZZATO;
});
