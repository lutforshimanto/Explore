import React from 'react';

const NewsletterCardSkeleton: React.FC = () => {
  return (
    <div className="card mb-4 p-4 border rounded-md shadow-md animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
      <div className="h-4 bg-gray-300 rounded-md mb-4"></div>
      <div className="flex justify-between">
        <div className="w-24 h-8 bg-gray-300 rounded-md"></div>
        <div className="w-24 h-8 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default NewsletterCardSkeleton;
