import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import FilterIssue from "./FilterIssue";

const IssueAction = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <FilterIssue />
      
      <Link href="/issues/new">
        <button
          type="button"
          className="text-white bg-cyan-500 rounded-md p-3 text-lg"
        >
          <FaPlus />
        </button>
      </Link>
    </div>
  );
};

export default IssueAction;
