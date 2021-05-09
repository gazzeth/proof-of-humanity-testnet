// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import { IProofOfHumanity } from "./interfaces/IProofOfHumanity.sol";

contract ProofOfHumanity is IProofOfHumanity {

    struct Register {
        bool submitted;
        bool registered;
        bool superUser;
    }

    bool superUserAllowed;
    bool selfRegistrationAllowed;
    mapping(address => Register) registry;

    constructor(bool _superUserAllowed, bool _selfRegistrationAllowed) {
        superUserAllowed = _superUserAllowed;
        selfRegistrationAllowed = _selfRegistrationAllowed;
        registry[msg.sender] = Register(true, true, _superUserAllowed);
    }

    function isSuperUserAllowed() external view returns (bool) {
        return superUserAllowed;
    }

    function isSelfVouchingAllowed() external view returns (bool) {
        return superUserAllowed;
    }

    function isSubmitted(address _address) external view returns (bool) {
        return registry[_address].submitted;
    }

    function isRegistered(address _address) override external view returns (bool) {
        return registry[_address].registered;
    }

    function isSuperUser(address _address) external view returns (bool) {
        return registry[_address].superUser;
    }

    function submit() external {
        require(!registry[msg.sender].submitted, "Already submitted");
        registry[msg.sender].submitted = true;
    }

    function register(address _address) external {
        require(msg.sender != _address || selfRegistrationAllowed, "Self registration not allowed in this version");
        if (msg.sender != _address) {
            require(registry[msg.sender].registered, "You must be registered before registering others");
            require(registry[msg.sender].submitted, "Address must perform submission before being registered");
        }
        registry[_address].registered = true;
    }

    function sudoRegister(address _address, bool _submitted, bool _registered, bool _superUser) external {
        require(superUserAllowed, "Super user not allowed in this version");
        require(registry[msg.sender].superUser, "You must be a super user");
        registry[_address] = Register(_submitted, _registered, _superUser);
    }
}
