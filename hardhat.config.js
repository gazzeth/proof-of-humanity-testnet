require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");

// const INFURA_PROJECT_ID = "YOUR_INFURA_PROJECT_ID";

// const ROPSTEN_PRIVATE_KEY = "YOUR_ROPSTEN_PRIVATE_KEY";

module.exports = {
  solidity: "0.7.6",
  networks: {
    // ropsten: {
    //   url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
    //   accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    // }
  }
};
