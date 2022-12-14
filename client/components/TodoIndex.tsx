import { useContractRead } from 'wagmi'
import { BigNumber } from 'ethers';
import { AddTask } from './AddTask'
import { useState } from 'react';
import { address, TasklistContract } from '../lib/shared';
import { TodoList } from './TodoList';
import { Loading } from './Loading';

export const TodoIndex = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { isLoading, isError, data, error } = useContractRead({
    addressOrName: address,
    contractInterface: TasklistContract.abi,
    functionName: 'n_tasks',
    args: [],
    watch: true,
  });

  if (isError) {
    console.error(error);
    return <p>Something went wrong</p>;
  } else if (isLoading) {
    return <Loading />;
  }

  const taskCount = (data as unknown as BigNumber).toNumber();

  if (taskCount === 0) {
    return (
      <div className='flex grow items-center justify-center'>
        <h2 className="-mt-24 text-gray-500 text-xl">No tasks yet. <a href="#" onClick={() => setShowAddTask(true)} className='text-blue-500'>Create one</a>!</h2>
        <AddTask
          open={showAddTask}
          setOpen={setShowAddTask}
        />
      </div>
    )
  } else {
    return (
      <div>
        <TodoList nTasks={taskCount} />
      </div>
    )
  }
}
