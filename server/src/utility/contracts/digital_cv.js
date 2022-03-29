const certificates_artifact = require("../../../../smart_contract/build/contracts/DigitalCV.json");
const f_contract = require("../formatter/contract_formatter.js");
const blockchain = require("../constants/blockchain.js");

module.exports = {
  getAddress() {
    return certificates_artifact.networks[network.network_id].address;
  },
  async signCertificato(certificato, blockchain_key) {
    const text = f_contract(certificato);
    const certificates = await blockchain[blockchain_key].contract.deployed();
    return await certificates.createCertificate(text);
  },
};
