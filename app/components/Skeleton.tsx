interface Prop {
  width?: string,
  height?: string
}

const SkeletonLoading = ({ width, height }: Prop) => (
  <div className='animate-pulse flex space-x-4'>
    <div className="flex-1 space-y-4 py-1">
      <div className={`bg-gray-300 rounded-md ${width ? width : 'w-full'} ${height ? height : 'h-4'}`}></div>
    </div>
  </div>
);

export default SkeletonLoading;
