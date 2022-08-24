import { ethers } from "hardhat";

const deployTasklist = async () => {
  const Tasklist = await ethers.getContractFactory("Tasklist");
  const tasklist = await Tasklist.deploy();
  await tasklist.deployed();
  console.log(`Tasklist deployed to ${tasklist.address}`);
}

const deployMulticall = async () => {
  const Multicall = await ethers.getContractFactory("Multicall3");
  const multicall = await Multicall.deploy();
  await multicall.deployed();
  console.log(`Multicall deployed to ${multicall.address} on block ${await ethers.provider.getBlockNumber()}`);
}

async function main() {
  await deployTasklist();
  await deployMulticall();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
