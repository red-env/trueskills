const repository = require("./repository.js");

module.exports = {
  async create(req) {
    return await repository.create(req.body);
  },
  async searchMany(req) {
    return await repository.findManyByName(req.query.nome);
  },
  async searchOne(req) {
    return await repository.findOneById(req.query.id);
  },
  async delete(req) {
    return await repository.deleteAll();
  },
};
