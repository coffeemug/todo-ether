import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.12",
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: [12000, 22000],
      }
    }
  },
};

export default config;
