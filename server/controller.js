const contract = require("truffle-contract");
const certificates_artifact = require("../smart_contract/build/contracts/DigitalCV.json");
const truffle_config = require("../smart_contract/truffle-config.js");
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
        return certificates_artifact.networks[network.network_id].address
    },
    async addCertificate(certificate) {
        const certificates = await DigitalCV.deployed();
        return await certificates.createCertificate(
          certificate.title,
          certificate.description,
          certificate.max_vote,
          certificate.executor
        );
    },
    async getCertificate(id) {
        const certificates = await DigitalCV.deployed();
        const certificate = await certificates.certificates(id);
        return {
          id: certificate[0],
          title: certificate[1],
            description: certificate[2],
            max_vote: certificate[3],
            certifier: certificate[4],
          executor: certificate[5],
          __metadata: certificate,
        };
    },
    async addAssignment(assignment) {
        const certificates = await DigitalCV.deployed();
        return await certificates.createAssignment(
            assignment.student,
            assignment.certificate,
            assignment.comment,
            assignment.vote
        );
    },
    async getAssignment(id) {
        const certificates = await DigitalCV.deployed();
        const assignment = await certificates.assignments(id);
        const certificate = await this.getCertificate(assignment[2]);
        return {
          id: assignment[0],
          student: assignment[1],
          certificate,
          comment: assignment[3],
          vote: assignment[4],
          __metadata: assignment,
        };
    }
};
