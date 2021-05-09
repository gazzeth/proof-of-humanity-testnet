// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

interface IProofOfHumanity {

    /** @dev Return true if the submission is registered and not expired.
     *  @param _submissionAddress The address of the submission.
     *  @return Whether the submission is registered or not.
     */
    function isRegistered(address _submissionAddress) external view returns (bool);
}
