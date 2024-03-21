"use client";

import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import DeleteModal from "./deleteModal";

const DeleteButton = ({ issueId}: {issueId: number}) => {
  const [deleteToggle, setDeleteToggle] = useState<boolean>(false);

  return (
    <>
    <button
      onClick={() => setDeleteToggle(true)}
      type="button"
      className="outline-none border-none py-2 px-4 rounded-md bg-red-600 text-gray-50 flex space-x-4 items-center"
    >
      <FaDeleteLeft className="text-white" />
      <p>Delete Issue</p>
    </button>

    { deleteToggle && <DeleteModal setDeleteToggle={setDeleteToggle} issueId={issueId}/> }
    </>
  );
};

export default DeleteButton;
