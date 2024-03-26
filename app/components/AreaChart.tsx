"use client";

import { Issue } from "@prisma/client";
import {
  Area,
  CartesianGrid,
  AreaChart as Chart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import processData from "../utils/processing";

const AreaChart = ({ issues }: { issues: Issue[] }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <Chart
        data={processData(issues)}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="open" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="in_progress" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="closed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="OPEN"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#open)"
        />
        <Area
          type="monotone"
          dataKey="IN_PROGRESS"
          stroke="#ffc658"
          fillOpacity={1}
          fill="url(#in_progress)"
        />
        <Area
          type="monotone"
          dataKey="CLOSED"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#closed)"
        />
      </Chart>
    </ResponsiveContainer>
  );
};

export default AreaChart;
