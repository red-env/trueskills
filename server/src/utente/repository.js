const Model = require("./model.js");

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
  findOneById: (id) => Model.findById(id),
  findManyByName: async (nome) => {
    const regexp = new RegExp(nome || "");
    return await Model.find({
      $or: [{ username: regexp }],
    });
  },
  deleteAll: () => Model.deleteMany({}),
};
