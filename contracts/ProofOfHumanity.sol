// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import { IProofOfHumanity } from "./interfaces/IProofOfHumanity.sol";

contract ProofOfHumanity is IProofOfHumanity {

    mapping(address => bool) registeredAddresses;

    constructor() {
        registeredAddresses[msg.sender] = true;
    }

    function isRegistered(address _submissionAddress) override external view returns (bool) {
        return registeredAddresses[_submissionAddress];
    }
}
