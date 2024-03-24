"use client";

import React from "react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
  BarChart,
  Tooltip,
} from "recharts";
import { Props } from "./IssueSummary";

export default function IssueChart({ open, in_progress, closed }: Props) {
  const data: { label: string; value: number }[] = [
    { label: "Open", value: open },
    { label: "In Progress", value: in_progress },
    { label: "Closed", value: closed },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Bar
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#color)"
          barSize={60}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
