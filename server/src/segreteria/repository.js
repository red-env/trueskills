const Model = require("./model.js");

module.exports = {
  create: (obj) =>
    new Model({
      email: obj.email,
      telefono: obj.telefono,
      nome: obj.nome,
      p_iva: obj.p_iva,
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
