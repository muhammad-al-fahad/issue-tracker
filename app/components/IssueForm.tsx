"use client";

import "easymde/dist/easymde.min.css";
import { useForm, Controller, FieldValues } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
)

interface IssueStructure {
  title: string;
  description: string;
}

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueStructure>();

  async function onSubmit(data: FieldValues) {
    try {
        setLoading(true);
        if(issue) 
            await axios.patch("/api/issues/" + issue.id, data);
        else
            await axios.post("/api/issues", data);
        router.push("/issues");
    } catch(error){
        setLoading(false);
        setError((error as Error).message)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {error && (
        <div
          className="flex items-center bg-red-800 text-red-200 text-sm font-bold px-4 py-3 space-x-4"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="currentColor"
              d="M12 1.641l-11.278 19.567h22.556l-11.278-19.567zm0 3.982l8.937 15.536h-17.874l8.937-15.536zm0 4.646c-.513 0-.929.416-.929.929s.416.929.929.929.929-.416.929-.929-.416-.929-.929-.929zm-.429 8.041v-4.004h1.857v4.004h-1.857z"
            />
          </svg>
          <p>{error}</p>
        </div>
      )}
      <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            {...register("title", { required: true, minLength: 5 })}
            defaultValue={issue?.title}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
          />
          {errors.title?.type === "required" && (
            <p className="text-red-500 italic mt-2">
              Title is required.
            </p>
          )}
          {errors.title?.type === "minLength" && (
            <p className="text-red-500 italic mt-2">
              Title should have at least of 5 characters
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <Controller
            name="description"
            defaultValue={issue?.description}
            control={control}
            rules={{ required: true, minLength: 10 }}
            render={({ field }) => (
              <SimpleMDE
                placeholder="Write an issue..."
                spellCheck="false"
                {...field} 
              />
            )}
          />
          {errors.description?.type === "required" && (
            <p className="text-red-500 italic">
              Description is required.
            </p>
          )}
          {errors.description?.type === "minLength" && (
            <p className="text-red-500 italic">
              Description should have at least of 10 characters.
            </p>
          )}
        </div>
        <div className="flex items-center justify-center w-full">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/4 flex justify-center"
          >
            { loading ? <div className="animate-spin h-6 w-6 border-2 border-white border-t-blue-50/20 rounded-full"></div> : issue ? "Update" : "Create" }
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;