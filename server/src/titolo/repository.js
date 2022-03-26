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
  findManyByQuery: async (query) => {
    const filter = [];
    if (query.start) filter.push({data: {$gte: query.start}});
    if (query.end) filter.push({data: {$lt: query.end}});
    if (query.titolo) filter.push({titolo: new RegExp(query.titolo)});
    if (query.descrizione) filter.push({titolo: new RegExp(query.descrizione)});
    return await Model.find(filter.length > 0 ? {$and: filter} : {});
  },
  findManyBySegreteria: (segreteria) => Model.find({ segreteria }),
  addCertificato: (id, certificato) =>
    Model.updateOne({ _id: id }, { $push: { certificati: certificato } }),
  deleteAll: () => Model.deleteMany({}),
};
