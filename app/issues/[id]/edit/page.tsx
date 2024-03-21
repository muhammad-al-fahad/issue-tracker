import prisma from '@/prisma/client';
import dynamic from 'next/dynamic'
import Loading from './loading'

const IssueForm = dynamic(
  () => import('@/app/components/IssueForm'),
  {
    ssr: false,
    loading: () => <Loading />
  }
)

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