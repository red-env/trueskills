// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DigitalCV {

    /**
    Certificate
     */
    struct Certificate {
        uint id;
        string title;
        string description;
        uint max_vote;
        address certifier;
        string executor;
        uint[] assignments;
    }

    mapping(uint => Certificate) public certificates;

    event CreationCertificate(uint id, string title, string description, uint max_vote, address certifier, string executor);

    function createCertificate(string calldata _title, string calldata _description, uint _max_vote, string calldata _executor) external {
        require(bytes(_title).length > 0, "invalid title");
        require(_max_vote > 0, "invalid max vote");
        uint id = block.number;
        Certificate storage certificate = certificates[id];
        certificate.id = id;
        certificate.title = _title;
        certificate.description = _description;
        certificate.max_vote = _max_vote;
        certificate.executor = _executor;
        certificate.certifier = msg.sender;
        emit CreationCertificate(
            certificate.id, 
            certificate.title, 
            certificate.description, 
            certificate.max_vote, 
            certificate.certifier, 
            certificate.executor
        );
    }

    /**
    Assignment
     */
    struct Assignment {
        uint id;
        string student;
        uint certificate;
        string comment;
        uint vote;
    }

    mapping(uint => Assignment) public assignments;

    event CreationAssignment(uint id, string student, uint id_certificate, string title, string description, uint max_vote, address certifier, string executor, string comment, uint vote);

    function createAssignment(string calldata _student, uint _certificate, string calldata _comment, uint _vote) external {
        require(bytes(_student).length > 0, "non-valid student");
        require(certificates[_certificate].id > 0, "non-existent certificate");
        require(0 < _vote && _vote <= certificates[_certificate].max_vote, "invalid vote");
        uint id = block.number;
        Assignment storage assignment = assignments[id];
        assignment.id = id;
        assignment.student = _student;
        assignment.certificate = _certificate;
        assignment.comment = _comment;
        assignment.vote = _vote;
        certificates[_certificate].assignments.push(id);
        Certificate memory certificate = certificates[assignment.id];
        emit CreationAssignment(
            assignment.id, 
            assignment.student, 
            certificate.id, 
            certificate.title, 
            certificate.description, 
            certificate.max_vote, 
            certificate.certifier, 
            certificate.executor,
            assignment.comment, 
            assignment.vote
        );
    }

}