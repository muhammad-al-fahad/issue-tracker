import IssueForm from '@/app/components/IssueForm'
import prisma from '@/prisma/client';

interface Prop {
    params: {id: string}
}

const editIssue = async ({ params }: Prop) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return (
    <IssueForm issue={issue!}/>
  )
}

export default editIssue