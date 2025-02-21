'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Newsletter {
  id: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

const NewsletterComponent = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [selectedNewsletter, setSelectedNewsletter] =
    useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAllNewsletters = () => {
    setLoading(true);
    axios
      .get('http://localhost:3000/api/newsletters')
      .then(response => {
        setNewsletters(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetAllNewsletters();
  }, []);

  const handleGetNewsletterById = (id: string) => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/newsletters/${id}`)
      .then(response => {
        setSelectedNewsletter(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleCreateNewsletter = () => {
    setLoading(true);
    const newsletterData = {
      content:
        '<div><h1>New Newsletter</h1><p>This is a new newsletter content.</p></div>',
    };

    axios
      .post('http://localhost:3000/api/newsletters', newsletterData)
      .then(response => {
        setNewsletters([...newsletters, response.data]);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleUpdateNewsletter = (id: string) => {
    setLoading(true);
    const newsletterData = {
      content:
        '<div><h1>Updated Newsletter</h1><p>This newsletter has been updated.</p></div>',
    };

    axios
      .put(`/api/newsletters/${id}`, newsletterData)
      .then(response => {
        const updatedNewsletters = newsletters.map(newsletter =>
          newsletter.id === id ? response.data : newsletter
        );
        setNewsletters(updatedNewsletters);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleDeleteNewsletter = (id: string) => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/api/newsletters/${id}`)
      .then(() => {
        const updatedNewsletters = newsletters.filter(
          newsletter => newsletter.id !== id
        );
        setNewsletters(updatedNewsletters);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Newsletter Management</h1>

      <div className="space-x-2 mb-4">
        <button
          onClick={handleGetAllNewsletters}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Refresh Newsletters
        </button>
        <button
          onClick={handleCreateNewsletter}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Newsletter
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}

      <div className="grid grid-cols-1 gap-4">
        {newsletters.map(newsletter => (
          <div key={newsletter.id} className="border p-4 rounded">
            <div dangerouslySetInnerHTML={{ __html: newsletter.content }} />
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleGetNewsletterById(newsletter.id)}
                className="text-blue-500"
              >
                View Details
              </button>
              <button
                onClick={() => handleUpdateNewsletter(newsletter.id)}
                className="text-yellow-500"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteNewsletter(newsletter.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Created: {new Date(newsletter.createdAt).toLocaleDateString()}
              {newsletter.updatedAt &&
                ` (Updated: ${new Date(
                  newsletter.updatedAt
                ).toLocaleDateString()})`}
            </p>
          </div>
        ))}
      </div>

      {selectedNewsletter && (
        <div className="mt-4 border-t pt-4">
          <h2 className="text-xl font-bold mb-2">
            Selected Newsletter Details
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: selectedNewsletter.content }}
          />
          <p className="text-sm text-gray-500 mt-2">
            ID: {selectedNewsletter.id}
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsletterComponent;
