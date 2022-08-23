import { useContractRead } from 'wagmi'
import TasklistContract from '../../hardhat/artifacts/contracts/Tasklist.sol/Tasklist.json';
import { Interface } from "ethers/lib/utils"
import { BigNumber } from 'ethers';
import { AddTask } from './AddTask'
import { useState } from 'react';

const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = new Interface(TasklistContract.abi);

export const TodoIndex = () => {
  const [showAddTask, setShowAddTask] = useState(false);
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
    return <p className="-mt-24 text-gray-500 text-xl">Loading...</p>;
  }

  const taskCount = (data as unknown as BigNumber).toNumber();

  if (taskCount === 0) {
    return (
      <div>
        <h2 className="-mt-24 text-gray-500 text-xl">No tasks yet. <a href="#" onClick={() => setShowAddTask(true)} className='text-blue-500'>Create one</a>!</h2>
        <AddTask
          open={showAddTask}
          setOpen={setShowAddTask}
        />
      </div>
    )
  } else {
    return <p>Loaded</p>
  }
}
