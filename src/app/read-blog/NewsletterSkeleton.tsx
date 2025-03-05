import React from 'react';

const NewsletterSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Cover Skeleton */}
      <div className="w-full h-[35vh] bg-gray-200 mb-4" />

      <div className="flex flex-col px-24 py-10 w-full space-y-6">
        {/* Title Skeleton */}
        <div className="h-9 bg-gray-200 rounded-md w-3/4" />

        {/* Content Skeleton - Multiple lines */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
};

export default NewsletterSkeleton;
