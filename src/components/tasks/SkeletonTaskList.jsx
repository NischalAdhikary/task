export default function TaskItemSkeleton({ count = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-full p-4 border rounded-lg flex flex-col gap-3 sm:flex-row justify-between items-start sm:items-center bg-white animate-pulse"
        >
          <div className="flex-1 space-y-2">
            <div className="h-5 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="flex gap-4 mt-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
