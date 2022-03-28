const Model = require("./model.js");
const Exception = require("../utility/exception/exception.js");

module.exports = {
  create: (obj) =>
    new Model({
      username: obj.username,
      password: obj.password,
      ruolo_tipo: obj.ruolo_tipo,
      ruolo_id: obj.ruolo_id,
    }).save(),
  findOneByUsername: (username, with_password = false) =>
    with_password
      ? Model.findOne({ username }).select("+password").exec()
      : Model.findOne({ username }),
  findOneById: async (id, with_password = false) => {
    const model = await (with_password ? Model.findById(id).select("+password").exec() : Model.findById(id));
    if(model) return model;
    throw Exception.UTENTE_NON_ESISTENTE;
  },
  findManyByName: async (nome) => {
    const regexp = new RegExp(nome || "");
    return await Model.find({
      $or: [{ username: regexp }],
    });
  },
  changePassword: (_id, password) => Model.findByIdAndUpdate(_id, {password}),
  deleteAll: () => Model.deleteMany({}),
};
