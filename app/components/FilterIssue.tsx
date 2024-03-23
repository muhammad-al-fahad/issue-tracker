"use client";

import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";

interface FilterIssue {
  label: string;
  value?: Status;
}

const FilterIssues = () => {
  const issues: FilterIssue[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" }
  ]

  const router = useRouter()
  const searchParams = useSearchParams()
  const querySearch = searchParams.get('status')
  const issueLabel = issues.find((issue) => issue.value === querySearch)

  const [filterBy, setFilterBy] = useState<string>(issueLabel?.label || "All");
  const [filterToggle, setFilterToggle] = useState<boolean>(false);
  const childRef = useRef<HTMLUListElement>(null);
  const parentRef = useRef<HTMLButtonElement>(null);

  useOutsideEvent<HTMLUListElement, HTMLButtonElement>(childRef, setFilterToggle, parentRef);
  
  const handleChange = (issue: FilterIssue) => {
    const params = new URLSearchParams()

    if(issue.value) params.append('status', issue.value)
    if(searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!)

    const query = params.size ? `?${params.toString()}` : ''

    setFilterBy(issue.label);
    setFilterToggle(false);

    router.push('/issues' + query)
  };

  return (
      <div className="relative mt-2 w-40">
        <button
          ref={parentRef}
          type="button"
          className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={() => {
            setFilterToggle(!filterToggle)
          }}
        >
        <span className="ml-3 block truncate">
            {filterBy}
        </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {filterToggle &&
          <ul
            ref={childRef}
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {issues.map((issue) => (
              <li
                key={issue.label}
                className="text-gray-900 relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-cyan-600 hover:text-gray-50"
                id="listbox-option-0"
                role="option"
                aria-selected={filterBy === issue.label}
                onClick={() => handleChange(issue)}
              >
                <span className="font-normal ml-3 block truncate">
                    {issue.label}
                </span>
              </li>
            ))}
          </ul>
        }
      </div>
  );
};
const useOutsideEvent = <T extends HTMLElement, K extends HTMLElement>(ref: RefObject<T>, callback: Dispatch<SetStateAction<boolean>>, excludeRef?: RefObject<K>) => {
  useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
          if (ref.current && !ref.current.contains(event.target as Node) && !excludeRef?.current?.contains(event.target as Node)) {
              callback(false);
          }
      };

      document.addEventListener('mousedown', handleOutsideClick)

      return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [ref, callback, excludeRef])
}

export default FilterIssues;