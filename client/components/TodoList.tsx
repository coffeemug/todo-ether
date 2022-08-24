import { useMemo } from "react"
import { useContractReads } from "wagmi"
import { range } from 'lodash';
import { TasklistContract, address } from "../lib/shared";

type TodoListProps = {
  nTasks: number,
}

export const TodoList = ({ nTasks }: TodoListProps) => {
  const contracts = useMemo(() => [], [nTasks]);
  const { data, error } = useContractReads({
    contracts: range(0, nTasks).map(i => ({
      addressOrName: address,
      contractInterface: TasklistContract.abi,
      functionName: 'tasks',
      args: [i],
    }))
  });
  console.log(data, error)

  return <></>;
}
