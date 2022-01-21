import { expect } from "chai";
import { ethers } from "hardhat";

describe("Vrungel Token", function () {
  let VrnToken: any;
  let owner: any, user1: any, user2: any;

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const Vrn = await ethers.getContractFactory("VRN");
    const accounts = await ethers.getSigners();
    [owner, user1, user2] = accounts;
    VrnToken = await Vrn.deploy();
    const ownerBalance = await VrnToken.balanceOf(owner.address);
    expect(await VrnToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Mint token from owner", async function () {
    await VrnToken.mint(user1.address, 150);
    const balance = await VrnToken.balanceOf(user1.address);
    expect(await VrnToken.balanceOf(user1.address)).to.equal(balance);
  });

  it("Mint token from not owner", async function () {
    await expect(
      VrnToken.connect(user2).mint(user1.address, 150)
    ).to.be.revertedWith("You aren't owner");
  });

  it("Approve make address's owner", async function () {
    await VrnToken.connect(user2).approve(owner.address, 150);
    expect(await VrnToken.allowance(user2.address, owner.address)).to.equal(
      150
    );
  });

  it("Transfer token", async function () {
    await VrnToken.mint(user1.address, 150);
    await VrnToken.connect(user1).transfer(user2.address, 150);
    const balance = await VrnToken.balanceOf(user2.address);
    expect(balance).to.equal(150);
  });

  it("TransferFrom token", async function () {
    await VrnToken.mint(user1.address, 150);
    await VrnToken.connect(user1).approve(owner.address, 150);
    await VrnToken.transferFrom(user1.address, user2.address, 150);
    const balance = await VrnToken.balanceOf(user2.address);
    expect(balance).to.equal(300);
  });

  it("TransferFrom token without approve", async function () {
    await VrnToken.mint(user1.address, 150);
    await VrnToken.connect(user1).approve(owner.address, 100);
    await expect(
      VrnToken.transferFrom(user1.address, user2.address, 150)
    ).to.be.revertedWith("Amount exceeds allowance");
  });

  it("View name", async function () {
    const name = await VrnToken.name();
    expect(name).to.equal("Vrungel Token");
  });

  it("View symbol", async function () {
    const name = await VrnToken.symbol();
    expect(name).to.equal("VRN");
  });

  it("Burn owner", async function () {
    await VrnToken.burn(user2.address, 150);
    const balance = await VrnToken.balanceOf(user2.address);
    expect(balance).to.equal(150);
  });

  it("View decimals", async function () {
    const name = await VrnToken.decimals();
    expect(name).to.equal(18);
  });

  it("burning with a missing balance", async function () {
    await expect(VrnToken.burn(user2.address, 500)).to.be.revertedWith(
      "Burn amount exceeds balance"
    );
  });

  it("increaseAllowance", async function () {
    await VrnToken.connect(user2).approve(owner.address, 0);
    await VrnToken.connect(user2).increaseAllowance(owner.address, 50);
    const allowance = await VrnToken.allowance(user2.address, owner.address);
    expect(allowance).to.equal(50);
  });

  it("decreaseAllowance", async function () {
    await VrnToken.connect(user2).approve(owner.address, 150);
    const allowance1 = await VrnToken.allowance(user2.address, owner.address);
    await VrnToken.connect(user2).decreaseAllowance(owner.address, 50);
    const allowance = await VrnToken.allowance(user2.address, owner.address);
    expect(allowance).to.equal(+allowance1 - 50);
  });

  it("decreaseAllowance with a missing balance", async function () {
    await VrnToken.connect(user2).approve(owner.address, 0);
    await expect(
      VrnToken.connect(user2).decreaseAllowance(owner.address, 50)
    ).to.be.revertedWith("Decreased allowance below zero");
  });
});
