import { useMemo, useState } from "react"
import { useContractReads } from "wagmi"
import { range } from 'lodash';
import { TasklistContract, address } from "../lib/shared";
import { Loading } from './Loading';
import { AddTask } from './AddTask'

type TodoListProps = {
  nTasks: number,
}

export const TodoList = ({ nTasks }: TodoListProps) => {
  const [showAddTask, setShowAddTask] = useState(false);

  const contracts = useMemo(() => range(0, nTasks).map(i => ({
    addressOrName: address,
    contractInterface: TasklistContract.abi,
    functionName: 'tasks',
    args: [i],
  })), [nTasks]);

  const { isLoading, isError, data, error } = useContractReads({
    contracts,
  });

  if (isError) {
    return <p>Something went wrong</p>;
  } else if (isLoading) {
    return <Loading />;
  }

  

  return (
    <div className="flex flex-col mt-12 items-center">
      <table className="shadow-lg table-fixed w-3/5">
        <tr>
          <th className="border text-left py-1 px-2">Task name</th>
          <th className="border text-left py-1 px-2">Description</th>
          <th className="border text-left py-1 px-2">Bounty</th>
        </tr>
        {data!.map(task => <tr>
            <td className="border py-1 px-2">{task.name}</td>
            <td className="border py-1 px-2">{task.description}</td>
            <td className="border py-1 px-2">{task.bounty.toNumber()}</td>
          </tr>)}
      </table>

      <div className="w-3/5 justify-end flex mt-4">
        <button
          type="submit"
          className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setShowAddTask(true)}
        >
          Create task
        </button>
      </div>
      <AddTask
          open={showAddTask}
          setOpen={setShowAddTask}
        />
    </div>
  );
}
