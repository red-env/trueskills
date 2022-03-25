const repo_certificato = require("./repository.js");
const repo_studente = require("../studente/repository.js");
const repo_titolo = require("../titolo/repository.js");
const repo_segreteria = require("../segreteria/repository.js");
const contract_digital_cv = require("../utility/contracts/digital_cv.js");
const f_url_tx = require("../utility/formatter/url_tx_formatter.js");

module.exports = {
  async create(req) {
    const req_certificato = req.body;
    const titolo = await repo_titolo.findOneById(req_certificato.titolo);
    if (
      titolo.max_voto > 0 &&
      (!req_certificato.voto ||
        req_certificato.voto <= 0 ||
        req_certificato.voto > titolo.max_voto)
    )
      throw "Voto non valido";
    const segreteria = await repo_segreteria.findOneById(titolo.segreteria);
    const studente = await repo_studente.findOneById(req_certificato.studente);
    const res = await contract_digital_cv.signCertificato(
      titolo,
      req_certificato,
      studente,
      segreteria
    );
    const certificato = await repo_certificato.create(
      req_certificato,
      res.tx,
      await f_url_tx(res.tx, req_certificato.blockchain_type)
    );
    const update_studente = await repo_studente.addCertificato(certificato.studente, certificato._id);
    if (update_studente.modifiedCount <= 0) throw "Studente inesistente";
    const update_titolo = await repo_titolo.addCertificato(certificato.titolo, certificato._id);
    if (update_titolo.modifiedCount <= 0) throw "Titolo inesistente";
    return certificato;
  },
  async searchMany(req) {
    return await repo_certificato.findManyByName(req.query.nome);
  },
  async searchOne(req) {
    return await repo_certificato.findOneById(req.query.id);
  },
  async delete(req) {
    return await repo_certificato.deleteAll();
  },
};
