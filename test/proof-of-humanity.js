const { expect } = require("chai");

describe("Proof of Humanity contract", function() {

    describe("Super user and self registration allowed", async function() {

        let deployer;
        let address1;
        let address2;
        let proofOfHumanity;

        before(async function() {
            [deployer, address1, address2, ...addresses] = await ethers.getSigners();
            let ProofOfHumanity = await ethers.getContractFactory("ProofOfHumanity");
            proofOfHumanity = await ProofOfHumanity.deploy(_superUserAllowed = true, _selfRegistrationAllowed = true);
        });

        it("Deployment shoud allow super users and self regristation", async function() {
            expect(await proofOfHumanity.isSuperUserAllowed()).to.equal(true);
            expect(await proofOfHumanity.isSelfRegistrationAllowed()).to.equal(true);
        });

        it("Deployment should register the deployer as super user and set quantities", async function() {
            expect(await proofOfHumanity.isSubmitted(deployer.address)).to.equal(true);
            expect(await proofOfHumanity.isRegistered(deployer.address)).to.equal(true);
            expect(await proofOfHumanity.isSuperUser(deployer.address)).to.equal(true);
            expect(await proofOfHumanity.getSubmittedQuantity()).to.equal(1);
            expect(await proofOfHumanity.getRegisteredQuantity()).to.equal(1);
            expect(await proofOfHumanity.getSuperUserQuantity()).to.equal(1);
        });

        it("Registering a non submitted address must fail even when sender is a super user", async function() {
            expect(await proofOfHumanity.isSubmitted(address1.address)).to.equal(false);
            await expect(
                proofOfHumanity.register(address1.address)
            ).to.be.revertedWith("Address must perform submission before being registered");
        });

        it("Submitting set address as submitted and increases quantities", async function() {
            expect(await proofOfHumanity.getSubmittedQuantity()).to.equal(1);
            expect(await proofOfHumanity.isSubmitted(address1.address)).to.equal(false);
            await proofOfHumanity.connect(address1).submit();
            expect(await proofOfHumanity.getSubmittedQuantity()).to.equal(2);
            expect(await proofOfHumanity.isSubmitted(address1.address)).to.equal(true);
        });

        it("Self registering a submitted address set it as registered increasing quantities", async function() {
            expect(await proofOfHumanity.isSubmitted(address1.address)).to.equal(true);
            expect(await proofOfHumanity.isRegistered(address1.address)).to.equal(false);
            expect(await proofOfHumanity.getRegisteredQuantity()).to.equal(1);
            await proofOfHumanity.connect(address1).register(address1.address);
            expect(await proofOfHumanity.getRegisteredQuantity()).to.equal(2);
            expect(await proofOfHumanity.isRegistered(address1.address)).to.equal(true);
        });

        it("Super user can set a common address as super user", async function() {
            expect(await proofOfHumanity.isSuperUser(address1.address)).to.equal(false);
            await proofOfHumanity.sudoRegister(
                _address = address1.address, _submitted = true, _registered = true, _superUser = true
            );
            expect(await proofOfHumanity.isSubmitted(address1.address)).to.equal(true);
            expect(await proofOfHumanity.isRegistered(address1.address)).to.equal(true);
            expect(await proofOfHumanity.isSuperUser(address1.address)).to.equal(true);
            expect(await proofOfHumanity.getSubmittedQuantity()).to.equal(2);
            expect(await proofOfHumanity.getRegisteredQuantity()).to.equal(2);
            expect(await proofOfHumanity.getSuperUserQuantity()).to.equal(2);
        });

        it("Super user can not set address as registered without setting it as submitted too", async function() {
            await expect(
                proofOfHumanity.sudoRegister(
                    _address = address2.address, _submitted = false, _registered = true, _superUser = false
                )
            ).to.be.revertedWith("Can't be registered but not submitted");
        });
    });
});
