const Model = require("./model.js");

module.exports = {
  create: (obj) =>
    new Model({
      email: obj.email,
      telefono: obj.telefono,
      nome: obj.nome,
      cognome: obj.cognome,
      cf: obj.cf,
    }).save(),
  findOneById: (id) => Model.findById(id),
  findManyByName: async (nome) => {
    const regexp = new RegExp(nome || "");
    return await Model.find({
      $or: [{ nome: regexp }, { cognome: regexp }, { cf: regexp }],
    });
  },
  addCertificato: (id, certificato) =>
    Model.updateOne({ _id: id }, { $push: { certificati: certificato } }),
  deleteAll: () => Model.deleteMany({}),
};
