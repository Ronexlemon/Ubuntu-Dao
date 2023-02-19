require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path:".env"});
const KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    fantomtest:{
      url: "https://rpc.testnet.fantom.network",
      accounts: [KEY],
      chainId: 0xfa2,
    },
    
  }
};
