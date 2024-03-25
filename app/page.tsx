import prisma from "@/prisma/client";
import IssueSummary from "./components/IssueSummary";
import LatestIssue from "./components/LatestIssue";
import BarChart from "././components/BarChart"
import AreaChart from "././components/AreaChart"

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const in_progress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const issues = await prisma.issue.findMany({
    orderBy: {
        createdAt: 'asc'
    }
  });

  return (
    <div className="flex flex-col w-full h-full items-start justify-start space-x-0 space-y-4 lg:flex-row lg:space-x-8 lg:space-y-0">
      <div className="flex flex-col w-full h-full space-y-4 flex-[100%]">
        <IssueSummary open={open} in_progress={in_progress} closed={closed}/>
        <BarChart open={open} in_progress={in_progress} closed={closed}/>
        <AreaChart issues={issues}/>
      </div>
      <LatestIssue />
    </div>
  );
}

export const dynamic = 'force-dynamic';