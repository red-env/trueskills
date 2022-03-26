const repo_titolo = require("./repository.js");
const repo_segreteria = require("../segreteria/repository.js");
const repo_certificato = require("../certificato/repository.js");
const repo_studente = require("../studente/repository.js");
const Exception = require("../utility/exception/exception.js");

async function formatTitolo(titolo) {
  titolo = titolo.toObject();
  titolo.segreteria = (await repo_segreteria.findOneById(titolo.segreteria)).toObject();
  titolo.segreteria.titoli = undefined;
  for (const [index_c, c] of titolo.certificati.entries()) {
    titolo.certificati[index_c] = (await repo_certificato.findOneById(c)).toObject();
    c.studente = (await repo_studente.findOneById(c.studente)).toObject();
  }
  return titolo;
}

module.exports = {
  async create(req) {
    const req_titolo = req.body;
    req_titolo.segreteria = req.auth.ruolo._id;
    const titolo = await repo_titolo.create(req_titolo);
    if (titolo.max_voto === 0 || titolo.max_voto < 0)
      throw Exception.MASSIMO_VOTO_NON_VALIDO;
    const update_segreteria = await repo_segreteria.addTitolo(
      req.auth.ruolo._id,
      titolo._id
    );
    if (update_segreteria.modifiedCount <= 0)
      throw Exception.SEGRETERIA_NON_ESISTENTE;
    return await formatTitolo(titolo);
  },
  async searchMany(req) {
    const titoli = await repo_titolo.findManyByQuery(req.query);
    for (const [i, titolo] of titoli.entries())
      titoli[i] = await formatTitolo(titolo);
    return titoli;
  },
  async searchManyBySegreteria(req) {
    const titoli = await repo_titolo.findManyBySegreteria(req.auth.ruolo._id);
    for (const [i, titolo] of titoli.entries())
      titoli[i] = await formatTitolo(titolo);
    return titoli;
  },
  async searchOne(req) {
    return await formatTitolo(await repo_titolo.findOneById(req.query.id));
  },
  async delete(req) {
    return await repo_titolo.deleteAll();
  },
};
