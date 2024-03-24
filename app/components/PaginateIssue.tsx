'use client'

import { useRouter, useSearchParams } from "next/navigation";

interface PaginateProps {
  itemCounts: number;
  pageSize: number;
  currentPage: number;
}

const PaginateIssue = ({
  itemCounts,
  pageSize,
  currentPage,
}: PaginateProps) => {
  const pageCount = Math.ceil(itemCounts / pageSize);
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (page: number) => {
    const params = new URLSearchParams()
    if(searchParams.get('status')) params.append('status', searchParams.get('status')!)
    if(searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!)
    params.set("page", page.toString())
  
    router.push("?" + params.toString())
  }

  if(pageCount <= 1) return null
  return (
    <div className="flex items-center justify-end border-gray-200 bg-white py-2">
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm max-w-[300px] sm:max-w-full overflow-auto"
        aria-label="Pagination"
      >
        <button
          type="button"
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-300 focus:z-20 focus:outline-offset-0"
          onClick={() => handleChange(currentPage - 1)}
        >
          <span className="sr-only">Previous</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {pageNumbers.map((page) => (
          <button
            type="button"
            key={page}
            aria-current="page"
            className={`relative z-10 inline-flex items-center ${page === currentPage ? "bg-indigo-600 text-white" : "bg-gray-50 ring-1 ring-inset ring-gray-300 hover:bg-gray-300 text-gray-400"} px-4 py-2 text-sm font-semibold`}
            onClick={() => handleChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          disabled={currentPage === pageCount}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-300 focus:z-20 focus:outline-offset-0"
          onClick={() => handleChange(currentPage + 1)}
        >
          <span className="sr-only">Next</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default PaginateIssue;
