import { task } from "hardhat/config";
// eslint-disable-next-line node/no-unpublished-import
import "@nomiclabs/hardhat-waffle";

// npx hardhat transferFrom --from 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 --to 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC --value 15000000000000000000 --network localhost
task("transferFrom", "Prints an contract's balance")
  .addParam("from", "The from address")
  .addParam("to", "The to address")
  .addParam("value", "The transfer value")
  .setAction(async (taskArgs, hre) => {
    const Vrn = await hre.ethers.getContractFactory("VRN");
    const accounts = await hre.ethers.getSigners();
    const contractInstance = new hre.ethers.Contract(
      process.env.CONTRACT_ADDRESS || "",
      Vrn.interface,
      accounts[0]
    );
    await contractInstance.transferFrom(
      taskArgs.from,
      taskArgs.to,
      taskArgs.value
    );
  });

module.exports = {};
