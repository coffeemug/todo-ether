import { useMemo } from "react"
import { useContractReads } from "wagmi"
import { range } from 'lodash';
import { TasklistContract, address } from "../lib/shared";
import { Loading } from './Loading';

type TodoListProps = {
  nTasks: number,
}

export const TodoList = ({ nTasks }: TodoListProps) => {
  const contracts = useMemo(() => range(0, nTasks).map(i => ({
    addressOrName: address,
    contractInterface: TasklistContract.abi,
    functionName: 'tasks',
    args: [i],
  })), [nTasks]);

  const { isLoading, isError, data, error } = useContractReads({
    contracts: range(0, nTasks).map(i => ({
      addressOrName: address,
      contractInterface: TasklistContract.abi,
      functionName: 'tasks',
      args: [i],
    })),
  });

  console.log(data, error)
  if (isError) {
    return <p>Something went wrong</p>;
  } else if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {data!.map(task => <p>{task.name}, {task.description}, {task.bounty.toNumber()}</p>)}
    </div>
  );
}
