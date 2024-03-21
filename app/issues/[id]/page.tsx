import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import StatusBadge from "../../components/statusBadge";
import ReactMarkdown from "react-markdown";
import { FaPencilAlt } from 'react-icons/fa'
import Link from "next/link";

interface Props {
  params: { id: string };
}

const IssueDetail = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) return notFound();
  return (
    <div className="w-full max-w-screen mx-auto grid grid-cols-2 gap-4">
      <div className="max-w-5xl h-full p-2">
        <h1 className="text-3xl font-bold">{issue.title}</h1>
        <div className="flex space-x-4 my-2">
          <StatusBadge status={issue.status} />
          <div>{issue.createdAt.toDateString()}</div>
        </div>
        <div className="prose max-w-3xl border border-gray-300 rounded-lg mt-4 p-4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </div>
      </div>
      <div className="w-full h-full p-2">
        <button type="button" className="outline-none border-none py-2 px-4 rounded-md bg-cyan-600 text-gray-50">
            <Link href={`/issues/${issue.id}/edit`} className="flex space-x-4 items-center">
                <FaPencilAlt className="text-white"/>
                <p>Edit Issue</p>
            </Link>
        </button>
      </div>
    </div>
  );
};

export default IssueDetail;