import Skeleton from "../../components/Skeleton";

const Loading = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <form className="px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <Skeleton height="h-8"/>
        </div>
        <div className="mb-6">
          <label
            className="block mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <Skeleton height="h-64"/>
        </div>
        <div className="flex items-center justify-center w-full">
          <button
            type="submit"
            className=" py-2 px-4 w-1/4"
          >
            <Skeleton width="w-24" height="h-8"/>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Loading;
