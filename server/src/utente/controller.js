const repository = require("./repository.js");
const jsonwebtoken = require("jsonwebtoken");
const crypto = require("crypto");
const repo_studente = require("../studente/repository.js");
const repo_segreteria = require("../segreteria/repository.js");
const ruoli = require("../utility/constants/ruoli.json");

module.exports = {

  async login(req) {
    const req_utente = req.body;
    const password = crypto
      .createHmac("sha256", process.env.CRYPTO_SECRET)
      .update(req_utente.password)
      .digest("base64");
    const utente = await repository.findOneByUsername(
      req_utente.username,
      true
    );
    if (!utente) throw "Utente inesistente";
    if (utente.password === password) {
      utente.password = undefined;
      let ruolo = {};
      if (utente.ruolo_tipo == ruoli.SEGRETERIA) {
        ruolo = await repo_segreteria.findOneById(utente.ruolo_id);
      } else if (utente.ruolo_tipo == ruoli.STUDENTE) {
        ruolo = await repo_studente.findOneById(utente.ruolo_id);
      }
      const jwt = jsonwebtoken.sign({ utente, ruolo }, process.env.JWT_SECRET);
      return jwt;
    } else {
      throw "Password errata";
    }
  },

  async create(req) {
    const req_utente = req.body;
    if (req_utente.ruolo_tipo == ruoli.SEGRETERIA) {
      req_utente.ruolo_id = (
        await repo_segreteria.create(req_utente.ruolo)
      )._id;
    } else if (req_utente.ruolo_tipo == ruoli.STUDENTE) {
      req_utente.ruolo_id = (await repo_studente.create(req_utente.ruolo))._id;
    }
    const utente = await repository.findOneByUsername(req_utente.username);
    if (utente) throw "Utente gia esistente con lo stesso username";
    req_utente.password = crypto
      .createHmac("sha256", process.env.CRYPTO_SECRET)
      .update(req_utente.password)
      .digest("base64");
    const out_utente = await repository.create(req_utente);
    out_utente.password = undefined;
    return out_utente;
  },

  async searchOne(req) {
    const authorization = req.headers["authorization"];
    return jsonwebtoken.decode(authorization.split(" ")[1]);
  },

  async delete(req) {
    return await repository.deleteAll();
  },
};
