import { task } from "hardhat/config";
// eslint-disable-next-line node/no-unpublished-import
import "@nomiclabs/hardhat-waffle";
// npx hardhat mint --to 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 --value 150000000000000000000 --network localhost
// npx hardhat mint --to 0x895e8772E842B2901B1C168218E5E4b2054616D7 --value 150000000000000000000 --network rinkeby
task("mint", "Mint tokens to address")
  .addParam("to", "The spender's address")
  .addParam("value", "The approve value")
  .setAction(async (taskArgs, hre) => {
    const Vrn = await hre.ethers.getContractFactory("VRN");
    const accounts = await hre.ethers.getSigners();
    const contractInstance = new hre.ethers.Contract(
      process.env.CONTRACT_ADDRESS || "",
      Vrn.interface,
      accounts[0]
    );
    await contractInstance.mint(taskArgs.to, taskArgs.value);
  });

module.exports = {};
