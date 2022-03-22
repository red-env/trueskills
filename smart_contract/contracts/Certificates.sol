// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract Certificates {

    enum Gender {
        MALE,
        FEMALE,
        OTHER
    }

    struct Assignment {
        uint id;
        uint student;
        uint certificate;
        string comment;
        uint vote;
    }

    struct Student {
        uint id;
        string name;
        string surname;
        uint256 birthdate;
        Gender gender;
        string cv; 
        uint[] assignments;
    }

    struct Certificate {
        uint id;
        string title;
        string description;
        uint max_vote;
        address certifier;
        uint[] assignments;
    }

    mapping(uint => Student) public students;

    mapping(uint => Certificate) public certificates;

    mapping(uint => Assignment) public assignments;

    function addCertificate(string calldata _title, string calldata _description, uint _max_vote) external {
        require(bytes(_title).length > 0, "invalid title");
        require(_max_vote > 0, "invalid max vote");
        uint id = block.number;
        Certificate storage certificate = certificates[id];
        certificate.id = id;
        certificate.title = _title;
        certificate.description = _description;
        certificate.max_vote = _max_vote;
        certificate.certifier = msg.sender;
    }

    function addStudent(string calldata _name, string calldata _surname, uint256 _birthdate, Gender _gender, string calldata _cv) external {
        require(bytes(_cv).length > 0, "invalid cv");
        uint id = block.number;
        Student storage student = students[id];
        student.id = id;
        student.name = _name;
        student.surname = _surname;
        student.birthdate = _birthdate;
        student.gender = _gender;
        student.cv = _cv;
    }

    function addAssignment(uint _student, uint _certificate, string calldata _comment, uint _vote) external {
        require(students[_student].id > 0, "non-existent student");
        require(certificates[_certificate].id > 0, "non-existent certificate");
        require(0 < _vote && _vote <= certificates[_certificate].max_vote, "invalid vote");
        uint id = block.number;
        Assignment storage assignment = assignments[id];
        assignment.id = id;
        assignment.student = _student;
        assignment.certificate = _certificate;
        assignment.comment = _comment;
        assignment.vote = _vote;
        students[_student].assignments.push(id);
        certificates[_certificate].assignments.push(id);
    }

}