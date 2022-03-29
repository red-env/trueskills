const blockchain = require("../utility/constants/blockchain.js");

module.exports = {
  async searchMany(req) {
    return Object.entries(blockchain).map((e) => {
      return { value: e[0], label: e[1].name };
    });
  },
};
