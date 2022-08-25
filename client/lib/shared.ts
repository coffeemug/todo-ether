import TasklistContract_ from '../../hardhat/artifacts/contracts/Tasklist.sol/Tasklist.json';
import { Interface } from "ethers/lib/utils"

export const TasklistContract = TasklistContract_;
export const address = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
export const abi = new Interface(TasklistContract.abi);
