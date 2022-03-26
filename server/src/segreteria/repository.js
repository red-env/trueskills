const Model = require("./model.js");

module.exports = {
  create: (obj) =>
    new Model({
      email: obj.email,
      telefono: obj.telefono,
      nome: obj.nome,
      p_iva: obj.p_iva,
      stemma_url: obj.stemma_url
    }).save(),
  findOneById: (id) => Model.findById(id),
  findManyByQuery: async (query) => {
      const filter = [];
      if (query.nome) filter.push({nome: new RegExp(query.nome)});
      if (query.p_iva) filter.push({cognome: new RegExp(query.p_iva)});
      return await Model.find(filter.length > 0 ? {$and: filter} : {});
  },
  addTitolo: (id, titolo) =>
    Model.updateOne(
      { _id: id },
      { $push: { titoli: titolo } }
    ),
  deleteAll: () => Model.deleteMany({}),
};
