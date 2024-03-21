import dynamic from 'next/dynamic'
import Loading from './loading'

const IssueForm = dynamic(
  () => import('@/app/components/IssueForm'),
  {
    ssr: false,
    loading: () => <Loading />
  }
)

const newIssue = () => {
  return (
    <IssueForm />
  )
}

export default newIssue
