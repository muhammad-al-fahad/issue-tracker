import prisma from "@/prisma/client";
import Link from "next/link";
import StatusBadge from "../components/statusBadge";
import IssueAction from "../components/issueAction";

const Issues = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <>
      <IssueAction />

      <div className="max-w-screen overflow-x-auto rounded-lg my-5">
        <table className="table-auto min-w-full">
          <thead className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-300">
            <tr className="text-xs text-gray-800 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-300 border-b">
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr
                key={issue.id}
                className="bg-gray-100 text-gray-800 dark:text-gray-50 border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-3 text-blue-500/80 hover:underline hover:underline-offset-4">
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                </td>
                <td className="px-6 py-3">
                  <StatusBadge status={issue.status} />
                </td>
                <td className="px-6 py-3">{issue.createdAt.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Issues;
