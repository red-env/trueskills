const repository = require("./repository.js");
const jsonwebtoken = require("jsonwebtoken");
const repo_studente = require("../studente/repository.js");
const repo_segreteria = require("../segreteria/repository.js");
const ruoli = require("../utility/constants/ruoli.json");
const encrypt = require("../utility/crypto/password_utente.js");
const Exception = require("../utility/exception/exception");

module.exports = {

  async login(req) {
    const req_utente = req.body;
    if (!req_utente.username || !req_utente.password) throw Exception.CAMPI_AUTENTICAZIONE_MANCANTI;
    const password = encrypt(req_utente.password);
    const utente = await repository.findOneByUsername(req_utente.username, true);
    if (!utente || utente.ruolo_tipo !== req_utente.ruolo) throw Exception.UTENTE_NON_ESISTENTE;
    if (!utente) throw Exception.UTENTE_NON_ESISTENTE;
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
      throw Exception.PASSWORD_ERRATA;
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
    if (utente) throw Exception.UTENTE_GIA_ESISTENTE;
    req_utente.password = encrypt(req_utente.password);
    const out_utente = await repository.create(req_utente);
    out_utente.password = undefined;
    return out_utente;
  },

  async searchOne(req) {
    return req.auth;
  },

  async delete(req) {
    return await repository.deleteAll();
  },
};
