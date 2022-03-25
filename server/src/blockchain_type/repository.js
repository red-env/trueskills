const Model = require("./model.js");

module.exports = {
  create: (obj) =>
    new Model({
      nome: obj.nome,
      url_base: obj.url_base,
    }).save(),
  findOneById: (id) => Model.findById(id),
  findManyByName: async (nome) => {
    const regexp = new RegExp(nome || "");
    return await Model.find({
      $or: [{ nome: regexp }],
    });
  },
  deleteAll: () => Model.deleteMany({}),
};
