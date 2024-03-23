import SkeletonLoading from "../components/Skeleton";
import IssueAction from "../components/IssueAction";

const Loading = () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <>
      <IssueAction />

      <div className="max-w-screen overflow-x-auto rounded-lg my-5">
        <table className="table-auto min-w-full">
          <thead className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-300">
            <tr className="text-xs text-gray-800 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-300 border-b">
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr
                key={issue}
                className="bg-gray-100 text-gray-800 dark:text-gray-50 border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-3">
                  <SkeletonLoading />
                </td>
                <td className="px-6 py-3">
                  <SkeletonLoading />
                </td>
                <td className="px-6 py-3">
                  <SkeletonLoading />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Loading;
