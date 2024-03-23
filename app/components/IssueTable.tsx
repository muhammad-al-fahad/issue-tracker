import Link from 'next/link'
import React from 'react'
import { FaArrowUp } from 'react-icons/fa6'
import StatusBadge from './StatusBadge'
import { Issue, Status } from '@prisma/client'

interface Column {
    label: string
    value: string
}

export interface SearchParams {
    status: Status
    orderBy: keyof Issue
    page: string
}

interface Props {
    searchParams: SearchParams
    issues: Issue[]
}

const column: Column[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status" },
    { label: "Created", value: "createdAt" }
]

export const columnNames = column.map((column) => column.value)

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    
    <div className="max-w-screen overflow-x-auto rounded-lg my-3">
    {issues.length === 0 ? (
      <h1 className="text-3xl font-semibold text-gray-400/50 text-center">
        No Issue Found
      </h1>
    ) : (
      <table className="table-auto min-w-full">
        <thead className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-300">
          <tr className="text-xs text-gray-800 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-300 border-b">
            {
              column.map((column) => (
                <th scope="col" key={column.value} className="px-6 py-3">
                  <Link href={{
                    query: { ...searchParams, orderBy: column.value }
                  }} className="flex items-center gap-1">
                    {column.label}
                    {column.value === searchParams.orderBy && <FaArrowUp />}
                  </Link>
                </th>
              ))
            }
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
              <td className="px-6 py-3">
                {issue.createdAt.toDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  )
}

export default IssueTable