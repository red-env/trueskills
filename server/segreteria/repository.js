const Model = require("./model.js");

module.exports = {
  create: (utente) =>
    new Model({
      password: utente.password,
      email: utente.email,
      telefono: utente.telefono,
      nome: utente.nome,
      p_iva: utente.p_iva,
    }).save(),
  findOneById: (id) => Model.findById(id),
  findManyByName: async (nome) => {
    const regexp = new RegExp(nome || "");
    return await Model.find({
      $or: [{ nome: regexp }, { p_iva: regexp }],
    });
  },
  addTitolo: (id, titolo) =>
    Model.updateOne(
      { _id: id },
      { $push: { titoli: titolo } }
    ),
  deleteAll: () => Model.deleteMany({}),
};
