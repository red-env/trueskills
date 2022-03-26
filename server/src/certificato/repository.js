const Model = require("./model.js");
const Exception = require("../utility/exception/exception.js");

module.exports = {
  create: (obj, tx_hash, tx_url) =>
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
    return await Model.find(filter.length > 0 ? {$and: filter} : {});
  },
  findManyByStudente: (studente) => Model.find({ studente }),
  deleteAll: () => Model.deleteMany({}),
};
