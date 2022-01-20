import { task } from "hardhat/config";
// eslint-disable-next-line node/no-unpublished-import
import "@nomiclabs/hardhat-waffle";
// npx hardhat mint --to 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 --value 150000000000000000000 --network localhost
task("mint", "Mint tokens to address")
  .addParam("to", "The spender's address")
  .addParam("value", "The approve value")
  .setAction(async (taskArgs, hre) => {
    const Vrn = await hre.ethers.getContractFactory("VRN");
    const account = await hre.ethers.getSigners();
    const contractInstance = new hre.ethers.Contract(
      process.env.CONTRACT_ADDRESS || "",
      Vrn.interface,
      account[0]
    );
    await contractInstance.mint(taskArgs.to, taskArgs.value);
    const balance = await contractInstance.balanceOf(taskArgs.to);

    console.log(taskArgs.to, " balance:", balance);
  });

module.exports = {};
