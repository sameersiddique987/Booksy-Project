import React from 'react';

function SkeletonLoader() {
  return (
    <div className="animate-pulse p-6 max-w-5xl mx-auto space-y-6">
      {/* Banner or Image Placeholder */}
      <div className="h-64 w-full bg-gray-200 rounded-md"></div>

      {/* Title */}
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>

      {/* Subtitle or price */}
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>

      {/* Paragraph lines */}
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>

      {/* Button placeholder */}
      <div className="h-10 w-32 bg-gray-300 rounded"></div>
    </div>
  );
}

export default SkeletonLoader;

