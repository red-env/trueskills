const repo_certificato = require("./repository.js");
const repo_studente = require("../studente/repository.js");
const repo_titolo = require("../titolo/repository.js");
const repo_segreteria = require("../segreteria/repository.js");
const contract_digital_cv = require("../utility/contracts/digital_cv.js");
const f_url_tx = require("../utility/formatter/url_tx_formatter.js");
const generate_pdf_certificato = require("../utility/pdf/generate_pdf_certificato.js");
const ruoli = require("../utility/constants/ruoli.json");
const Exception = require("../utility/exception/exception.js");

async function formatCertificato(certificato, flag=true) {
  if(flag) certificato = certificato.toObject();
  certificato.studente = (
    await repo_studente.findOneById(certificato.studente)
  ).toObject();
  certificato.titolo = (
    await repo_titolo.findOneById(certificato.titolo)
  ).toObject();
  certificato.titolo.segreteria = (
    await repo_segreteria.findOneById(certificato.titolo.segreteria)
  ).toObject();
  return certificato;
}

module.exports = {
  async create(req) {
    const req_certificato = await formatCertificato(
      Object.assign({}, req.body), false
    );
    if (
      req_certificato.titolo &&
      req_certificato.titolo.max_voto > 0 &&
      (!req_certificato.voto ||
        req_certificato.voto <= 0 ||
        req_certificato.voto > req_certificato.titolo.max_voto)
    )
      throw Exception.VOTO_NON_VALIDO;
    if(req_certificato.titolo.segreteria._id != req.auth.ruolo._id)
      throw Exception.TITOLO_NON_ESISTENTE;
    const res = await contract_digital_cv.signCertificato(req_certificato);
    req.body.tx_hash = res.tx;
    req.body.tx_url = await f_url_tx(res.tx, req_certificato.blockchain_type);
    const certificato = await repo_certificato.create(req.body);
    const update_studente = await repo_studente.addCertificato(
      certificato.studente,
      certificato._id
    );
    if (update_studente.modifiedCount <= 0)
      throw Exception.STUDENTE_NON_ESISTENTE;
    const update_titolo = await repo_titolo.addCertificato(
      certificato.titolo,
      certificato._id
    );
    if (update_titolo.modifiedCount <= 0)
      throw Exception.TITOLO_NON_ESISTENTE;
    return await formatCertificato(certificato);
  },
  async searchMany(req) {
    const certificati = await repo_certificato.findManyQuery(req.query);
    for (const [i, certificato] of certificati.entries())
      certificati[i] = await formatCertificato(certificato);
    return certificati;
  },
  async searchManyPersonali(req) {
    let certificati = [];
    if (req.auth.utente.ruolo_tipo === ruoli.STUDENTE)
      certificati = await repo_certificato.findManyByStudente(
        req.auth.ruolo._id
      );
    else if (req.auth.utente.ruolo_tipo === ruoli.SEGRETERIA) {
      const titoli = await repo_titolo.findManyBySegreteria(req.auth.ruolo._id);
      for (const titolo of titoli)
        for (const certificato_id of titolo.certificati)
          certificati.push(await repo_certificato.findOneById(certificato_id));
    }
    for (const [i, certificato] of certificati.entries())
      certificati[i] = await formatCertificato(certificato);
    return certificati;
  },
  async searchOne(req) {
    return await formatCertificato(
      await repo_certificato.findOneById(req.query.id)
    );
  },
  async generatePdf(req, res) {
    const certificato = await formatCertificato(
      await repo_certificato.findOneById(req.query.id)
    );
    await generate_pdf_certificato(certificato, res);
  },
  async delete(req) {
    return await repo_certificato.deleteAll();
  },
};
