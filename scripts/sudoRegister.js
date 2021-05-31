async function main() {
    const [sender] = await ethers.getSigners();
    console.log("Calling contract with the account:", sender.address);
    const ProofOfHumanity = await ethers.getContractFactory("ProofOfHumanity");
    const proofOfHumanityAddress = "0x9b1590A4D36255b3b18Bb681062FD159f809009f";
    const proofOfHumanity = await ProofOfHumanity.attach(proofOfHumanityAddress);
    const addressToRegister = "0x4b546D68A70E4D09F27827CD8a3b02A35A012964";
    const submitted = true;
    const registered = true;
    const superUser = true;
    const transaction = await proofOfHumanity.sudoRegister(addressToRegister, submitted, registered, superUser);
    console.log("Transaction:", transaction);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
