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
