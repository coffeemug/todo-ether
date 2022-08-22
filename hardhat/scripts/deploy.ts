import { ethers } from "hardhat";

async function main() {
  const Tasklist = await ethers.getContractFactory("Tasklist");
  const tasklist = await Tasklist.deploy();

  await tasklist.deployed();

  console.log(`Tasklist deployed to ${tasklist.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
