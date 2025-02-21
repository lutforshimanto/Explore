import React from 'react';

const PhotoCardSkeleton = () => {
  return (
    <article className="min-w-[320px] min-h-[300px] max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden m-4">
      <div className="w-full h-48 bg-gray-200 animate-pulse" />

      <div className="p-6">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />

        <div className="space-y-2">
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="mt-2 h-4 w-24 bg-gray-200 rounded animate-pulse" />
      </div>
    </article>
  );
};

export default PhotoCardSkeleton;
