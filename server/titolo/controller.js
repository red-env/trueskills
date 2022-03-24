const repo_titolo = require("./repository.js");
const repo_segreteria = require("../segreteria/repository.js");

module.exports = {
  async create(req) {
    const titolo = await repo_titolo.create(req.body);
    await repo_segreteria.addTitolo(titolo.segreteria, titolo._id);
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
