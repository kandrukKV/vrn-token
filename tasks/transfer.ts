import { task } from "hardhat/config";
// eslint-disable-next-line node/no-unpublished-import
import "@nomiclabs/hardhat-waffle";

task("contract-balance", "Prints an contract's balance").setAction(
  async (taskArgs, hre) => {
    const Vrn = await hre.ethers.getContractFactory("VRN");
    const [account] = await hre.ethers.getSigners();
    const contractInstance = new hre.ethers.Contract(
      process.env.CONTRACT_ADDRESS || "",
      Vrn.interface,
      account
    );
    const res = await contractInstance.name();
    console.log("Owner:", res);
  }
);

module.exports = {};
