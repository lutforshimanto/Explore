'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';

import Cover from '@/components/Cover';

import NewsletterEditor from '../NewsletterEditor';
import NewsletterSkeleton from '../../NewsletterSkeleton';

interface Newsletter {
  id: string;
  title: string;
  coverPhoto: string;
  content: string;
  createdAt: string;
}

const EditNewsletterPage: React.FC = () => {
  const { id } = useParams();
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/newsletters/${id}`
        );
        setNewsletter(response.data);
        setTitle(response.data.title);
        setCoverUrl(response.data.coverPhoto);
      } catch (error) {
        console.error('Error fetching newsletter:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsletter();
    }
  }, [id]);

  const handleSave = async (updatedContent: string) => {
    try {
      await axios.put(`http://localhost:3000/api/newsletters/${id}`, {
        ...newsletter,
        title,
        coverPhoto: coverUrl,
        content: updatedContent,
      });
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error('Error updating newsletter:', error);
    }
  };

  const enableCover = () => {
    setCoverUrl(
      'https://1t2k916rlb.ufs.sh/f/600x5gkLzosPnUNBvKDWpMwiLVmF2Ques6DdPt0cgrvj4hln'
    );
  };

  if (loading) {
    return <NewsletterSkeleton />;
  }

  if (!newsletter) {
    return <div>Newsletter not found</div>;
  }

  return (
    <div className="mb-4">
      <Cover url={coverUrl} setUrl={setCoverUrl} />
      <div className="flex flex-col px-24 py-10 w-full">
        <div className="group flex flex-col gap-2">
          {!coverUrl && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="hover:bg-neutral-100 text-neutral-400 rounded-md px-3 py-1 transition-colors"
                onClick={enableCover}
              >
                📷 Add cover
              </button>
            </div>
          )}
          <TextareaAutosize
            placeholder="Untitled"
            className="w-full py-2 resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none leading-none"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <NewsletterEditor
          initialContent={newsletter.content}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default EditNewsletterPage;
