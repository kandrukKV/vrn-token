import { task } from "hardhat/config";
// eslint-disable-next-line node/no-unpublished-import
import "@nomiclabs/hardhat-waffle";

// npx hardhat approve --spender 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 --value 100000000000000000000 --network localhost
task("approve", "Make approve for address")
  .addParam("spender", "The spender's address")
  .addParam("value", "The approve value")
  .setAction(async (taskArgs, hre) => {
    const Vrn = await hre.ethers.getContractFactory("VRN");
    const account = await hre.ethers.getSigners();
    const contractInstance = new hre.ethers.Contract(
      process.env.CONTRACT_ADDRESS || "",
      Vrn.interface,
      account[1]
    );
    await contractInstance.approve(taskArgs.spender, taskArgs.value);
    const allowance = await contractInstance.allowance(
      account[1].address,
      taskArgs.spender
    );
    console.log(account[1].address, "allowance = ", allowance);
  });

module.exports = {};
