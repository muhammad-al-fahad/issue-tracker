import SkeletonLoading from "@/app/components/Skeleton";

const Loading = () => {
  return (
    <div>
      <div>
        <SkeletonLoading width='max-w-3xl'/>
      </div>
      <div className="flex space-x-4 my-2">
        <div>
          <SkeletonLoading width="w-24"/>
        </div>
        <div>
          <SkeletonLoading width="w-24"/>
        </div>
      </div>
      <div className="max-w-3xl border border-gray-300 rounded-lg mt-4 p-4">
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
      </div>
    </div>
  );
};

export default Loading;
