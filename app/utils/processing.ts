import { Issue } from "@prisma/client";

const processData = (issues: Issue[]): { date: string; OPEN: number; IN_PROGRESS: number; CLOSED: number }[] => {
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

export default processData;