import { useMemo, useState } from "react"
import { useContractReads } from "wagmi"
import { range } from 'lodash';
import { TasklistContract, address } from "../lib/shared";
import { Loading } from '../components/Loading';
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import { Welcome } from '../components/Welcome';

const SubmissionList: NextPage = () => {
  const router = useRouter();

  const taskIdx = Number.parseInt(router.query.taskIdx as string);
  const taskName = router.query.taskName as string;
  const nSubmissions = Number.parseInt(router.query.nSubmissions as string);

  const contracts = useMemo(() => range(0, nSubmissions).map(i => ({
    addressOrName: address,
    contractInterface: TasklistContract.abi,
    functionName: 'getSubmission',
    args: [taskIdx, i],
  })), [taskIdx]);

  const { isLoading, isError, data, error } = useContractReads({
    contracts,
    watch: true,
  });

  if (isError) {
    return <p>Something went wrong</p>;
  } else if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Welcome />
      <div className="flex flex-col mt-12 items-center">
        <div className="w-3/5 justify-start">
          <p className="mb-5 text-2xl">Submissions for task <span className='bg-gray-100 p-1'>{taskName}</span></p>
        </div>
        <table className="shadow-lg w-3/5">
          <thead>
            <tr>
              <th className="border text-left py-1 px-2"></th>
              <th className="border text-left py-1 px-2">Description</th>
              <th className="border text-left py-1 px-2">Author</th>
            </tr>
          </thead>
          <tbody>
            {data!.map((job, idx) =>
              <tr key={idx}>
                <td className="border py-1 px-2">
                  <a className="text-blue-500" href="#">Accept</a>
                </td>
                <td className="border py-1 px-2">{job.description}</td>
                <td className="border py-1 px-2">{job.owner.slice(0, 4)}...{job.owner.slice(-4)}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SubmissionList;