import { useMemo, useState } from "react"
import { useContractReads } from "wagmi"
import { range } from 'lodash';
import { TasklistContract, address } from "../lib/shared";
import { Loading } from './Loading';
import { AddTask } from './AddTask'
import { AddJob } from './AddJob';

type TodoListProps = {
  nTasks: number,
}

type TaskInfo = {
  taskIdx?: number | undefined,
  taskName?: string | undefined,
}

export const TodoList = ({ nTasks }: TodoListProps) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [activeTaskInfo, setActiveTaskInfo] = useState<TaskInfo>({});
  const [showAddJob, setShowAddJob] = useState(false);

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

  const onAddJob = (taskIdx: number) => {
    setShowAddJob(true);
    setActiveTaskInfo({
      taskIdx,
      taskName: data![taskIdx].name,
    });
  }

  return (
    <div className="flex flex-col mt-12 items-center">
      <table className="shadow-lg table-fixed w-3/5">
        <thead>
          <tr>
            <th className="border text-left py-1 px-2">Task name</th>
            <th className="border text-left py-1 px-2">Description</th>
            <th className="border text-left py-1 px-2">Bounty</th>
            <th className="border text-left py-1 px-2">Owner</th>
          </tr>
        </thead>
        <tbody>
          {data!.map((task, idx) => <tr key={idx}>
              <td className="border py-1 px-2">
                {task.name}
                {task.n_submissions.gt(0) && <>
                  <br />
                  <a href="#" className="text-xs text-blue-400">{task.n_submissions.toNumber()} submissions</a>
                </>}
                <br />
                <a href="#" onClick={() => onAddJob(idx)} className="text-xs text-blue-400">submit job</a>
              </td>
              <td className="border py-1 px-2">{task.description}</td>
              <td className="border py-1 px-2">{task.bounty.toNumber()}</td>
              <td className="border py-1 px-2">{task.owner.slice(0, 4)}...{task.owner.slice(-4)}</td>
            </tr>)}
        </tbody>
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
      <AddJob
          open={showAddJob}
          setOpen={setShowAddJob}
          taskId={activeTaskInfo.taskIdx}
          taskName={activeTaskInfo.taskName}
        />
    </div>
  );
}
