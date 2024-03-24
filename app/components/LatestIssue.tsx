import prisma from "@/prisma/client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import StatusBadge from "./StatusBadge";

const LatestIssue = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      assigneeToUser: true,
    },
  });

  return (
    <div className="border py-3 px-6 rounded-lg w-full flex-[75%]">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {issues.map((issue) => (
          <li key={issue.id} className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 flex-col flex space-y-2 justify-start items-start">
                <Link
                  href={`/issues/${issue.id}`}
                  aria-label={issue.title}
                  className="text-sm font-medium text-gray-900 truncate dark:text-white"
                >
                  {issue.title}
                </Link>
                <StatusBadge status={issue.status} />
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {issue.assigneeToUser && (
                  <Image
                    src={issue.assigneeToUser.image!}
                    alt="Assignee User"
                    height={40}
                    width={40}
                    className="rounded-full"
                  />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestIssue;
