const Model = require("./model.js");
const Exception = require("../utility/exception/exception.js");

module.exports = {
  create: (obj) =>
    new Model({
      email: obj.email,
      telefono: obj.telefono,
      nome: obj.nome,
      cognome: obj.cognome,
      cf: obj.cf,
    }).save(),
    findOneById: async (id) => {
      const model = await Model.findById(id);
      if(model) return model;
      throw Exception.STUDENTE_NON_ESISTENTE;
    },
  findManyByQuery: async (query) => {
      const filter = [];
      if (query.nome) filter.push({nome: new RegExp(query.nome)});
      if (query.cognome) filter.push({cognome: new RegExp(query.cognome)});
      if (query.cf) filter.push({cf: new RegExp(query.cf)});
      return await Model.find(filter.length > 0 ? {$and: filter} : {});
  },
  addCertificato: (id, certificato) =>
    Model.updateOne({ _id: id }, { $push: { certificati: certificato } }),
  deleteAll: () => Model.deleteMany({}),
};
