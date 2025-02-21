import React from 'react';

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const PhotoCard: React.FC<{ photo: Photo }> = ({ photo }) => {
  return (
    <article className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden m-4 transition-transform hover:scale-105">
      <img
        src={photo.thumbnailUrl}
        alt={photo.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">
          Album #{photo.albumId} • Photo #{photo.id}
        </div>
        <h3 className="text-lg font-medium text-gray-900 truncate">
          {photo.title}
        </h3>
        <a
          href={photo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-indigo-600 hover:text-indigo-500"
        >
          View full size →
        </a>
      </div>
    </article>
  );
};

export default PhotoCard;
