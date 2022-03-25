const Model = require("./model.js");

module.exports = {
  create: (obj, tx_hash, tx_url) =>
    new Model({
      titolo: obj.titolo,
      studente: obj.studente,
      voto: obj.voto,
      commento: obj.commento,
      tx_hash: obj.tx_hash,
      tx_url: obj.tx_url,
    }).save(),
  findOneById: (id) => Model.findById(id),
  findManyByName: async (nome) => {
    const regexp = new RegExp(nome || "");
    return await Model.find({
      $or: [{ commento: regexp }],
    });
  },
  findManyByStudente: (studente) => Model.find({ studente }),
  deleteAll: () => Model.deleteMany({}),
};
