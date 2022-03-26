const repo_titolo = require("./repository.js");
const repo_segreteria = require("../segreteria/repository.js");
const repo_certificato = require("../certificato/repository.js");
const repo_studente = require("../studente/repository.js");

async function formatStudente(studente) {
  studente = studente.toObject();
  for (const [index_c, c] of studente.certificati.entries()) {
    studente.certificati[index_c] = (await repo_certificato.findOneById(c)).toObject();;
    c.titolo = (await repo_titolo.findOneById(c.titolo)).toObject();;
    c.titolo.certificato.segreteria = (await repo_segreteria.findOneById(c.titolo.certificato.segreteria)).toObject();;
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
    return await formatStudente(
      await repo_studente.findOneById(req.query.id || req.auth.ruolo._id)
    );
  },
  async delete(req) {
    return await repo_studente.deleteAll();
  },
};
