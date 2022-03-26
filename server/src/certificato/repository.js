const Model = require("./model.js");
const Exception = require("../utility/exception/exception.js");

module.exports = {
  create: (obj) =>
    new Model({
      titolo: obj.titolo,
      studente: obj.studente,
      voto: obj.voto,
      commento: obj.commento,
      tx_hash: obj.tx_hash,
      tx_url: obj.tx_url,
    }).save(),
    findOneById: async (id) => {
      const model = await Model.findById(id);
      if(model) return model;
      throw Exception.CERTIFICATO_NON_ESISTENTE;
    },
  findManyQuery: async (query) => {
    const filter = [];
    if (query.start) filter.push({data: {$gte: query.start}});
    if (query.end) filter.push({data: {$lt: query.end}});
    if (query.commento) filter.push({commento: new RegExp(query.commento)});
    if (query.studente) filter.push({studente: query.studente});
    if (query.titoli) filter.push({titoli: {$in: query.titoli}})
    return await Model.find(filter.length > 0 ? {$and: filter} : {});
  },
  deleteAll: () => Model.deleteMany({}),
};
