const repo_blockchain_type = require("../../blockchain_type/repository.js");

module.exports = async (tx, type) => {
    const blockchain_type = await repo_blockchain_type.findOneById(type);
    return blockchain_type.url_base + tx;
};