const contract = require("truffle-contract");
const certificates_artifact = require("../../../../smart_contract/build/contracts/DigitalCV.json");
const truffle_config = require("../../../../smart_contract/truffle-config.js");
const f_contract = require("../formatter/contract_formatter.js");

const network = truffle_config.networks.ropsten;

// Configuration
function getContract() {
    const provider = network.provider();
    const DigitalCV = contract(certificates_artifact);
    DigitalCV.setProvider(provider);
    DigitalCV.defaults({
      from: process.env.ACCOUNT_ADDRESS,
    });
    return DigitalCV;
}

const DigitalCV = getContract();

module.exports = {
  getAddress() {
    return certificates_artifact.networks[network.network_id].address;
  },
  async signCertificato(titolo, certificato, studente, segreteria) {
    const text = f_contract(titolo, certificato, studente, segreteria);
    const certificates = await DigitalCV.deployed();
    return await certificates.createCertificate(text);
  },
};
