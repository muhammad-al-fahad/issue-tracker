"use client";

import { Issue, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa6";
import Skeleton from "./Skeleton";
import { useRouter } from "next/navigation";

interface Prop {
  issue: Issue
}

const AssigneeUser = ({ issue }: Prop) => {
  const { data: users, isLoading, error } = useUser();
  const currentUser = users?.find((user) => user.id === issue.assigneeToUserId);

  const [assignTo, setAssignTo] = useState<User | null>(null);
  const [assignToggle, setAssignToggle] = useState<boolean>(false);
  const childRef = useRef<HTMLUListElement>(null);
  const parentRef = useRef<HTMLButtonElement>(null);
  const router = useRouter()

  useOutsideEvent<HTMLUListElement, HTMLButtonElement>(childRef, setAssignToggle, parentRef);
  
  const handleChange = (user: User | null) => {
    setAssignTo(user);
    setAssignToggle(false);
    
    axios.patch(`/api/issues/${issue.id}`, {
      title: issue.title,
      description: issue.description,
      assigneeToUserId: user?.id || null
    });
    router.refresh()
  };

  useEffect(() => {
    setAssignTo(currentUser || null);
  }, [currentUser, isLoading]);


  if(isLoading || !users) return <Skeleton width='w-48' height="h-8" />
  else if(error) return null;
  return (
      <div className="relative mt-2 w-2/3 md:w-1/3">
        <button
          ref={parentRef}
          type="button"
          className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={() => {
            setAssignToggle(!assignToggle)
            setAssignTo(currentUser || null)
          }}
        >
          <span className="flex items-center">
            {assignTo?.image ? (
              <Image
                src={assignTo?.image}
                alt=""
                className="h-5 w-5 flex-shrink-0 rounded-full"
                width={50}
                height={50}
              />
            )
            : <FaUser />
            }
            <span className="ml-3 block truncate">
              {assignTo?.name || "Assignee to..."}
            </span>
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
        {assignToggle && (
          <ul
            ref={childRef}
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            <li
                className="text-gray-900 relative select-none py-2 pl-3 pr-9 hover:bg-cyan-600 hover:text-gray-50 border-b last:border-b-0 cursor-pointer"
                id="listbox-option-0"
                role="option"
                aria-selected={assignTo?.id === null}
                onClick={() => handleChange(null)}
              >
                <div className="flex items-center">
                  <FaUser />
                  <span className="font-normal ml-3 block truncate">
                    Unassigned
                  </span>
                </div>
              </li>
            {users.map((user) => (
              <li
                key={user.id}
                className="text-gray-900 relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-cyan-600 hover:text-gray-50"
                id="listbox-option-0"
                role="option"
                aria-selected={assignTo?.id === user.id}
                onClick={() => handleChange(user)}
              >
                <div className="flex items-center">
                  <Image
                    src={user.image || ""}
                    alt=""
                    className="h-5 w-5 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                  />
                  <span className="font-normal ml-3 block truncate">
                    {user.name || ""}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
  );
};

const useUser = () => useQuery<User[]>({
  queryKey: ["users"],
  queryFn: () => axios.get("/api/users").then((res) => res.data),
  staleTime: 60 * 1000,
  retry: 3
});

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

export default AssigneeUser;
