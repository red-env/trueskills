const Model = require("./model.js");

module.exports = {
  create: (obj, tx_hash, tx_url) =>
    new Model({
      titolo: obj.titolo,
      studente: obj.studente,
      voto: obj.voto,
      commento: obj.commento,
      tx_hash: tx_hash,
      tx_url: tx_url
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
