import { Status } from '@prisma/client'
import React from 'react'

interface Props {
    status: Status
}

const statusMap: Record<Status, { label: string, color: string}> = {
    OPEN: { label: 'Open', color: 'bg-red-500/15 text-red-500'},
    IN_PROGRESS: { label: 'In Progress', color: 'bg-purple-500/15 text-purple-500'},
    CLOSED: { label: 'Closed', color: 'bg-green-500/15 text-green-500'}
}

const statusBadge = ({ status }: Props) => {
    return (
        <span
            className={`${statusMap[status].color} font-medium py-1 px-2 rounded-md`}
        >
            {statusMap[status].label}
        </span>
    )
}

export default statusBadge