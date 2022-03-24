const Model = require("./model.js");

module.exports = {
  create: (obj) =>
    new Model({
      titolo: obj.titolo,
      studente: obj.studente,
      voto: obj.voto,
      commento: obj.commento,
    }).save(),
  findOneById: (id) => Model.findById(id),
  findManyByName: async (nome) => {
    const regexp = new RegExp(nome || "");
    return await Model.find({
      $or: [{ commento: regexp }],
    });
  },
  deleteAll: () => Model.deleteMany({}),
};
