'use client'

import { Issue } from '@prisma/client';
import { Area, AreaChart as Chart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const AreaChart = ({ issues }: { issues: Issue[]}) => {
  const processData = (): { date: string; OPEN: number; IN_PROGRESS: number; CLOSED: number }[] => {
    const dateCountsMap = new Map<string, { [status: string]: number }>();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const filteredIssues = issues.filter(issue => new Date(issue.createdAt) >= sevenDaysAgo);

    filteredIssues.forEach(issue => {
        const createdAt = new Date(issue.createdAt);
        const dateKey = createdAt.toISOString().split('T')[0];
        
        if (!dateCountsMap.has(dateKey)) {
            dateCountsMap.set(dateKey, { OPEN: 0, IN_PROGRESS: 0, CLOSED: 0 });
        }

        const status = issue.status;
        dateCountsMap.get(dateKey)![status]++;
    });

    return Array.from(dateCountsMap).map(([date, counts]) => ({
        date,
        OPEN: counts.OPEN || 0,
        IN_PROGRESS: counts.IN_PROGRESS || 0,
        CLOSED: counts.CLOSED || 0,
    }));
};

  return (
    <ResponsiveContainer width="100%" height={400}>
      <Chart data={processData()}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="OPEN" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="IN_PROGRESS" stackId="1" stroke="#ffc658" fill="#ffc658" />
        <Area type="monotone" dataKey="CLOSED" stackId="1" stroke="#8884d8" fill="#8884d8" />
      </Chart>
    </ResponsiveContainer>
  )
}

export default AreaChart