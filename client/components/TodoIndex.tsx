import { useContractRead, useProvider } from 'wagmi'
import TasklistContract from '../../hardhat/artifacts/contracts/Tasklist.sol/Tasklist.json';
import { Interface } from "ethers/lib/utils"
import { BigNumber, ethers } from 'ethers';
import { useEffect } from 'react';

const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = new Interface(TasklistContract.abi);

export const TodoIndex = () => {
  const { isLoading, isError, data } = useContractRead({
    addressOrName: address,
    contractInterface: TasklistContract.abi,
    functionName: 'getTasksCount',
    args: [],
    staleTime: 100,
  });

  if (isError) {
    return <p>Something went wrong</p>;
  } else if (isLoading) {
    return <p>Loading...</p>;
  }

  const taskCount = (data as unknown as BigNumber).toNumber();

  if (taskCount === 0) {
    return (
      <div>
        <h2 className="-mt-16 text-gray-500 text-xl">No tasks yet. <a href="#" className='text-blue-500'>Create one</a>!</h2>
      </div>
    )
  } else {
    return <p>Loaded</p>
  }
}
