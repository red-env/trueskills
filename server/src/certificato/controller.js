const repo_certificato = require("./repository.js");
const repo_studente = require("../studente/repository.js");
const repo_titolo = require("../titolo/repository.js");
const repo_segreteria = require("../segreteria/repository.js");
const contract_digital_cv = require("../utility/contracts/digital_cv.js");
const f_url_tx = require("../utility/formatter/url_tx_formatter.js");
const Exception = require("../utility/exception/exception.js");

async function formatCertificato(certificato) {
  certificato.studente = await repo_studente.findOneById(certificato.studente);
  certificato.titolo = await repo_titolo.findOneById(certificato.titolo);
  certificato.titolo.segreteria = await repo_segreteria.findOneById(
    certificato.titolo.segreteria
  );
  return certificato;
}

module.exports = {
  async create(req) {
    const req_certificato = await formatCertificato(Object.assign({}, req.body));
    if (
      req_certificato.titolo &&
      req_certificato.titolo.max_voto > 0 &&
      (!req_certificato.voto ||
        req_certificato.voto <= 0 ||
        req_certificato.voto > req_certificato.titolo.max_voto)
    )
      throw new Exception("VOTO_NON_VALIDO");
    const res = await contract_digital_cv.signCertificato(req_certificato);
    req.body.tx_hash = res.tx;
    req.body.tx_url = await f_url_tx(res.tx, req_certificato.blockchain_type);
    const certificato = await repo_certificato.create(req.body);
    const update_studente = await repo_studente.addCertificato(
      certificato.studente,
      certificato._id
    );
    if (update_studente.modifiedCount <= 0)
      throw new Exception("STUDENTE_NON_ESISTENTE");
    const update_titolo = await repo_titolo.addCertificato(
      certificato.titolo,
      certificato._id
    );
    if (update_titolo.modifiedCount <= 0)
      throw new Exception("TITOLO_NON_ESISTENTE");
    return await formatCertificato(certificato);
  },
  async searchMany(req) {
    const certificati = await repo_certificato.findManyByName(req.query.nome);
    for (const [i, certificato] of certificati.entries())
      certificati[i] = await formatCertificato(certificato);
    return certificati;
  },
  async searchManyByStudente(req) {
    const certificati = await repo_certificato.findManyByStudente(
      req.auth.ruolo._id
    );
    for (const [i, certificato] of certificati.entries())
      certificati[i] = await formatCertificato(certificato);
    return certificati;
  },
  async searchOne(req) {
    return await formatCertificato(
      await repo_certificato.findOneById(req.query.id)
    );
  },
  async delete(req) {
    return await repo_certificato.deleteAll();
  },
};
