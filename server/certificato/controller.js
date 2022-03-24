const repo_certificato = require("./repository.js");
const repo_studente = require("../studente/repository.js");
const repo_titolo = require("../titolo/repository.js");

module.exports = {
  async create(req) {
    const certificato = await repo_certificato.create(req.body);
    await repo_studente.addCertificato(certificato.studente, certificato._id);
    await repo_titolo.addCertificato(certificato.titolo, certificato._id);
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
