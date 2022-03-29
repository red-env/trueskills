const blockchain = require("../constants/blockchain.js");

module.exports = async (tx, type) => {
    return blockchain[type].scan_url + tx;
};