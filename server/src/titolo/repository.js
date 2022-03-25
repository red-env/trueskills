const Model = require("./model.js");

module.exports = {
  create: (obj) =>
    new Model({
      titolo: obj.titolo,
      descrizione: obj.descrizione,
      max_voto: obj.max_voto,
      segreteria: obj.segreteria,
    }).save(),
  findOneById: (id) => Model.findById(id),
  findManyByName: async (nome) => {
    const regexp = new RegExp(nome || "");
    return await Model.find({
      $or: [{ titolo: regexp }, { descrizione: regexp }],
    });
  },
  addCertificato: (id, certificato) =>
    Model.updateOne({ _id: id }, { $push: { certificati: certificato } }),
  deleteAll: () => Model.deleteMany({}),
};
