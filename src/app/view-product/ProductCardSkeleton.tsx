import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="card mb-4 p-4 border rounded-md shadow-md animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="flex justify-between">
        <div className="space-x-4">
          <div className="inline-block w-24 h-10 bg-gray-200 rounded-md" />
          <div className="inline-block w-24 h-10 bg-gray-200 rounded-md" />
        </div>
        <div className="w-24 h-10 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
