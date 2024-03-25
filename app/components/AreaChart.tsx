'use client'

import { Issue } from '@prisma/client';
import { Area, AreaChart as Chart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import processData from '../utils/processing';
import { useEffect, useState } from 'react';

const AreaChart = ({ issues }: { issues: Issue[]}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <Chart data={processData(issues)}>
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