const contract = require("truffle-contract");
const certificates_artifact = require("../../../../smart_contract/build/contracts/DigitalCV.json");
const truffle_config = require("../../../../smart_contract/truffle-config.js");

// Configuration
function getContract(network) {
    const provider = network.provider();
    const Contract = contract(certificates_artifact);
    Contract.setProvider(provider);
    Contract.defaults({
      from: process.env.ACCOUNT_ADDRESS,
    });
    return Contract;
}

class BlockchainSettings {
    constructor(name, scan_url, contract_settings) {
        this.name = name;
        this.scan_url = scan_url;
        this.contract = getContract(contract_settings);
    }
}

module.exports = {
    ETHEREUM: new BlockchainSettings("ETHEREUM ROPSTEIN", "https://ropsten.etherscan.io/tx/", truffle_config.networks.ropsten),
    POLYGON: new BlockchainSettings("POLYGON MUMBAI", "https://mumbai.polygonscan.com/tx/", truffle_config.networks.mumbai),
};