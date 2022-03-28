const repo_studente = require("./repository.js");
const repo_segreteria = require("../segreteria/repository.js");
const repo_certificato = require("../certificato/repository.js");
const repo_titolo = require("../titolo/repository.js");
const ruoli = require("../utility/constants/ruoli.json");

async function formatStudente(studente) {
  studente = studente.toObject();
  for (const [index_c, c] of studente.certificati.entries()) {
    const certificato = (await repo_certificato.findOneById(c)).toObject();
    studente.certificati[index_c] = certificato;
    certificato.titolo = (
      await repo_titolo.findOneById(certificato.titolo)
    ).toObject();
    certificato.titolo.segreteria = (
      await repo_segreteria.findOneById(certificato.titolo.segreteria)
    ).toObject();
  }
  return studente;
}

module.exports = {
  async create(req) {
    return await formatStudente(await repo_studente.create(req.body));
  },
  async searchMany(req) {
    const studenti = await repo_studente.findManyByQuery(req.query);
    for (const [i, studente] of studenti.entries())
      studenti[i] = await formatStudente(studente);
    return studenti;
  },
  async searchOne(req) {
    if (ruoli.STUDENTE == req.auth.utente.ruolo_tipo)
      return await formatStudente(
        await repo_studente.findOneById(req.auth.ruolo._id)
      );
    else if (ruoli.SEGRETERIA == req.auth.utente.ruolo_tipo)
      return await formatStudente(
        await repo_studente.findOneById(req.query.id)
      );
  },
  async delete(req) {
    return await repo_studente.deleteAll();
  },
};
