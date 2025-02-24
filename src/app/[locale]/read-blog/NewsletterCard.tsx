import { Link } from '@/i18n/routing';
import React from 'react';

interface Newsletter {
  id: string;
  title: string;
  coverPhoto: string;
  createdAt: string;
}

interface NewsletterCardProps {
  newsletter: Newsletter;
  onDelete: (id: string) => void;
}

const NewsletterCard: React.FC<NewsletterCardProps> = ({
  newsletter,
  onDelete,
}) => {
  return (
    <div className="card mb-4 p-4 border rounded-md shadow-md">
      <img
        src={newsletter.coverPhoto}
        alt={newsletter.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{newsletter.title}</h2>
      <p className="text-gray-500 mb-4">
        Last updated: {new Date(newsletter.createdAt).toLocaleDateString()}
      </p>
      <div className="flex justify-between">
        <div className="space-x-4">
          <Link
            href={`/read-blog/${newsletter.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            View Details
          </Link>
          <Link
            href={`/read-blog/edit/${newsletter.id}`}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Edit
          </Link>
        </div>
        <button
          onClick={() => onDelete(newsletter.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NewsletterCard;
