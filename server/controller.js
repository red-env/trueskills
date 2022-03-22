const contract = require("truffle-contract");
const certificates_artifact = require("../smart_contract/build/contracts/Certificates.json");
const truffle_config = require("../smart_contract/truffle-config.js");
const Web3 = require("web3");

// Configuration
function getContract() {
    const network = truffle_config.networks.ropsten;
    const provider = network.provider();
    const Certificates = contract(certificates_artifact);
    Certificates.setProvider(provider);
    Certificates.defaults({
      from: process.env.ACCOUNT_ADDRESS,
    });
    return Certificates;
}

module.exports = {
    async addStudent(student) {
        student.birthdate = new Date(student.birthdate).getTime();
        const certificates = await getContract().deployed();
        return await certificates.addStudent(
            student.name,
            student.surname,
            student.birthdate,
            student.gender,
            student.cv
        );
    },
    async getStudent(id) {
        const certificates = await getContract().deployed();
        const student = await certificates.students(id);
        return {
          id: student[0],
          name: student[1],
          surname: student[2],
          birthdate: new Date(Number.parseInt(student[3])).toLocaleDateString(),
          gender: student[4] == 0 ? "Male" : student[4] == 1 ? "Female" : "Other",
          __metadata: student,
        };
    },
    async addCertificate(certificate) {
        const certificates = await getContract().deployed();
        return await certificates.addCertificate(
            certificate.title,
            certificate.description,
            certificate.max_vote
        );
    },
    async getCertificate(id) {
        const certificates = await getContract().deployed();
        const certificate = await certificates.certificates(id);
        return {
          id: certificate[0],
          title: certificate[1],
            description: certificate[2],
            max_vote: certificate[3],
          certifier: certificate[4],
          __metadata: certificate,
        };
    },
    async addAssignment(assignment) {
        const certificates = await getContract().deployed();
        return await certificates.addAssignment(
            assignment.student,
            assignment.certificate,
            assignment.comment,
            assignment.vote
        );
    }
};
