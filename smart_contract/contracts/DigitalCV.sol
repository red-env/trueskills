// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DigitalCV {

    mapping(uint => string) public certificates;

    event CreationCertificate(string certificate);

    function createCertificate(string calldata certificate) external {
        certificates[block.number] = certificate;
        emit CreationCertificate(certificate);
    }

}