import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const issueAction = () => {
  return (
    <button
      type="button"
      className="text-white bg-cyan-500 rounded-md p-3 text-lg"
    >
      <Link href="/issues/new">
        <FaPlus />
      </Link>
    </button>
  );
};

export default issueAction;
