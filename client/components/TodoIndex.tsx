import { useContractRead, useProvider } from 'wagmi'
import TasklistContract from '../../hardhat/artifacts/contracts/Tasklist.sol/Tasklist.json';
import { Interface } from "ethers/lib/utils"
import { ethers } from 'ethers';
import { useEffect } from 'react';

const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = new Interface(TasklistContract.abi);

export const TodoIndex = () => {
  const { status, isLoading, isFetching, error, data } = useContractRead({
    addressOrName: address,
    contractInterface: TasklistContract.abi,
    functionName: 'getTasksCount',
    args: [],
    staleTime: 100,
  });
  console.log(status, isFetching, data);

  return <></>
  //return <p>Contract call {data} {isError} {isLoading}</p>;
}

const useTaskCount = () => {
  const provider = useProvider();
  useEffect(() => {
    const contract = new ethers.Contract(address, abi, provider);
    const getTasksCount = async () => {
      console.log(await contract.n_tasks());
    }
    getTasksCount().catch(console.error);
  }, [provider]);
}
