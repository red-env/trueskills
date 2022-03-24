const Model = require("./model.js");

module.exports = {
  create: (utente) =>
    new Model({
      email: utente.email,
      telefono: utente.telefono,
      nome: utente.nome,
      cognome: utente.cognome,
      cf: utente.cf,
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
