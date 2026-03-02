export const StatsCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-6 space-y-3 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-lg bg-gray-200"></div>
    </div>
    <div>
      <div className="h-6 w-16 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-32 bg-gray-200 rounded"></div>
    </div>
    <div className="h-4 w-24 bg-gray-200 rounded"></div>
  </div>
);
