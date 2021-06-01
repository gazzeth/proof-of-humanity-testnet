require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("@nomiclabs/hardhat-etherscan");

// const INFURA_PROJECT_ID = "YOUR_INFURA_PROJECT_ID";

// const ROPSTEN_PRIVATE_KEY = "YOUR_ROPSTEN_PRIVATE_KEY";

// const ETHERSCAN_API_KEY = "YOUR_ETHERSCAN_API_KEY"

module.exports = {
  solidity: "0.7.6",
  // networks: {
  //   ropsten: {
  //     url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
  //     accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
  //   }
  // },
  // etherscan: {
  //   apiKey: `${ETHERSCAN_API_KEY}`
  // }
};
