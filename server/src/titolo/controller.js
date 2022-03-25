const repo_titolo = require("./repository.js");
const repo_segreteria = require("../segreteria/repository.js");

module.exports = {
  async create(req) {
    const titolo = await repo_titolo.create(req.body);
    if (titolo.max_voto === 0 || titolo.max_voto < 0) throw "Max voto non valido";
    const update_segreteria = await repo_segreteria.addTitolo(titolo.segreteria, titolo._id);
    if (update_segreteria.modifiedCount <= 0) throw "Segreteria inesistente";
    return titolo;
  },
  async searchMany(req) {
    return await repo_titolo.findManyByName(req.query.nome);
  },
  async searchOne(req) {
    return await repo_titolo.findOneById(req.query.id);
  },
  async delete(req) {
    return await repo_titolo.deleteAll();
  },
};
