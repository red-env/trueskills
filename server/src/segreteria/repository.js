const Model = require("./model.js");
const Exception = require("../utility/exception/exception.js");

module.exports = {
  create: (obj) =>
    new Model({
      email: obj.email,
      telefono: obj.telefono,
      nome: obj.nome,
      p_iva: obj.p_iva,
      stemma_url: obj.stemma_url
    }).save(),
    findOneById: async (id) => {
      const model = await Model.findById(id);
      if(model) return model;
      throw Exception.SEGRETERIA_NON_ESISTENTE;
    },
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
