async function main() {
    const [sender] = await ethers.getSigners();
    console.log("Calling contract with the account:", sender.address);
    const ProofOfHumanity = await ethers.getContractFactory("ProofOfHumanity");
    const proofOfHumanityAddress = "0x9b1590A4D36255b3b18Bb681062FD159f809009f";
    const proofOfHumanity = await ProofOfHumanity.attach(proofOfHumanityAddress);
    const addressesToRegister = [
        "0xB8f687f1956e2EcBb5D2D54e90FF8014bd4A872A",
        "0x80f2476Ed2c3338a08f4472Aa5c91AC9DA2CFDF4",
        "0x3a1b3F77DB4a528fdf2595B5932c035ED3cb1ac6",
        "0xf00e39c7c67944EB80B0270c80dBb126742bd722",
        "0x6038f3C658346e3109479241D498C2820A213232",
        "0x38986898cB84a2827DB0f1F2a76Fe5Abe2649520",
        "0xe03cF547eE1AE14eAa118AE17f88cd7d7e1F364A",
        "0x1BCB33D1d8350d42eAd7fe916d0238C24333BFb0",
        "0x8d5F546E98FC71fB8Cb7EEda009470094D10e268"
    ];
    const submitted = true;
    const registered = true;
    const superUser = false;
    for (i = 0; i < addressesToRegister.length; i++) {
        const transaction = await proofOfHumanity.sudoRegister(addressesToRegister[i], submitted, registered, superUser);
        console.log("Transaction:", transaction);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
