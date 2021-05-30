async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);
    const ProofOfHumanity = await ethers.getContractFactory("ProofOfHumanity");
    const superUserAllowed = true;
    const selfRegistrationAllowed = false;
    const proofOfHumanity = await ProofOfHumanity.deploy(superUserAllowed, selfRegistrationAllowed);
    console.log("Contract address:", proofOfHumanity.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
