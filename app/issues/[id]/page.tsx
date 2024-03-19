import prisma from "@/prisma/client"
import { notFound } from "next/navigation"
import StatusBadge from '../../components/statusBadge'
import ReactMarkdown from 'react-markdown'
import delay from "delay"

interface Props {
    params: { id: string }
}

const IssueDetail = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    await delay(3000)

    if(!issue) return notFound()
    return (
        <div>
            <h1 className="text-3xl font-bold">{issue.title}</h1>
            <div className="flex space-x-4 my-2">
                <StatusBadge status={issue.status} />
                <div>{issue.createdAt.toDateString()}</div>
            </div>
            <div className="prose max-w-3xl border border-gray-300 rounded-lg mt-4 p-4">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </div>
        </div>
    )
}

export default IssueDetail