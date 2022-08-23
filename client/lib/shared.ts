import TasklistContract_ from '../../hardhat/artifacts/contracts/Tasklist.sol/Tasklist.json';
import { Interface } from "ethers/lib/utils"

export const TasklistContract = TasklistContract_;
export const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const abi = new Interface(TasklistContract.abi);
