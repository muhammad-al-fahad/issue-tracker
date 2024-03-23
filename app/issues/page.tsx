import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueAction from "../components/IssueAction";
import IssueTable, { columnNames, SearchParams } from "../components/IssueTable";
import PaginateIssue from "../components/PaginateIssue";

interface Props {
  searchParams: SearchParams
}

const Issues = async ({ searchParams }: Props) => {

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const where = { status }
  const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy] : 'asc' } : undefined
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issuesCount = await prisma.issue.count({ where });

  return (
    <>
      <IssueAction />
      <IssueTable issues={issues} searchParams={searchParams}/>
      <PaginateIssue currentPage={page} itemCounts={issuesCount} pageSize={pageSize}/>
    </>
  );
};

export const dynamic = "force-dynamic";
export default Issues;
