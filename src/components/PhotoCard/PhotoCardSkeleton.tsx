import React from 'react';

const PhotoCardSkeleton: React.FC = () => {
  return (
    <article className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden m-4">
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div className="w-full h-48 bg-slate-200"></div>

        <div className="p-6">
          {/* Album/Photo ID skeleton */}
          <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>

          {/* Title skeleton */}
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>

          {/* Link skeleton */}
          <div className="mt-2 h-4 bg-slate-200 rounded w-1/4"></div>
        </div>
      </div>
    </article>
  );
};

export default PhotoCardSkeleton;
