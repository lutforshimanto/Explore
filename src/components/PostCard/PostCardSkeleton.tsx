import React from 'react';

const PostCardSkeleton: React.FC = () => {
  return (
    <article className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>

          {/* Title skeleton */}
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>

          {/* Body skeleton - multiple lines */}
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCardSkeleton;
