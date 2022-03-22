// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract Certificates {

    struct Assignment {
        uint student;
        uint certificate;
        string comment;
        uint vote;
    }

    enum Gender {
        MALE,
        FEMALE,
        OTHER
    }

    struct Student {
        uint id;
        string name;
        string surname;
        uint256 birthdate;
        Gender gender;
        string cv; 
        Assignment[] assignments;
    }

    struct Certificate {
        uint id;
        string title;
        string description;
        uint max_vote;
        address certifier;
        Assignment[] assignments;
    }

    mapping(uint => Student) public students;

    mapping(uint => Certificate) public certificates;

    function addCertificate(string calldata _title, string calldata _description, uint _max_vote) external {
        require(bytes(_title).length > 0, "invalid title");
        require(_max_vote > 0, "invalid max vote");
        Certificate storage certificate = certificates[block.number];
        certificate.id = block.number;
        certificate.title = _title;
        certificate.description = _description;
        certificate.max_vote = _max_vote;
        certificate.certifier = msg.sender;
    }

    function addStudent(string calldata _name, string calldata _surname, uint256 _birthdate, Gender _gender, string calldata _cv) external {
        require(bytes(_cv).length > 0, "invalid cv");
        Student storage student = students[block.number];
        student.id = block.number;
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
        Assignment memory assignment = Assignment({
            student: _student,
            certificate: _certificate,
            comment: _comment,
            vote: _vote
        });
        students[_student].assignments.push(assignment);
        certificates[_certificate].assignments.push(assignment);
    }

}