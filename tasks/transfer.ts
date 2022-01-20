import { task } from "hardhat/config";
// eslint-disable-next-line node/no-unpublished-import
import "@nomiclabs/hardhat-waffle";

// npx hardhat transfer --to 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC --value 15000000000000000000 --network localhost
task("transfer", "Prints an contract's balance")
  .addParam("to", "The to address")
  .addParam("value", "The transfer value")
  .setAction(async (taskArgs, hre) => {
    const Vrn = await hre.ethers.getContractFactory("VRN");
    const accounts = await hre.ethers.getSigners();
    const contractInstance = new hre.ethers.Contract(
      process.env.CONTRACT_ADDRESS || "",
      Vrn.interface,
      accounts[1]
    );
    await contractInstance.transfer(taskArgs.to, taskArgs.value);
  });

module.exports = {};
