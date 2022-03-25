const repo_segreteria = require("./repository.js");
const repo_titolo = require("../titolo/repository.js");
const repo_certificato = require("../certificato/repository.js");
const repo_studente = require("../studente/repository.js");

async function formatSegreteria(segreteria) {
  for (const [index_t, titolo] of segreteria.titoli.entries()) {
    const t = await repo_titolo.findOneById(titolo);
    segreteria.titoli[index_t] = t;
    for (const [index_c, certificato] of t.certificati.entries()) {
      const c = await repo_certificato.findOneById(certificato);
      t.certificati[index_c] = c;
      c.studente = await repo_studente.findOneById(c.studente);
    }
  }
  return segreteria;
}

module.exports = {
  async create(req) {
    return await formatSegreteria(await repo_segreteria.create(req.body));
  },
  async searchMany(req) {
    const segreterie = await repo_segreteria.findManyByName(req.query.nome);
    for (const [i, segreteria] of segreterie.entries())
      segreterie[i] = await formatSegreteria(segreteria);
    return segreterie;
  },
  async searchOne(req) {
    return await formatSegreteria(
      await repo_segreteria.findOneById(req.query.id || req.auth.ruolo._id)
    );
  },
  async delete(req) {
    return await repo_segreteria.deleteAll();
  },
};
