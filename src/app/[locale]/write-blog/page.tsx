'use client';

import dynamic from 'next/dynamic';
import { useState, useMemo, useEffect, useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Cover from '@/components/Cover';
import { setTitle, setCoverPhoto, resetHtml } from '@/redux/newsletterhtml';
import type { RootState } from '@/redux/store';

const WriteBlogPage = () => {
  const { html, title, coverPhoto } = useSelector(
    (state: RootState) => state.newsletterHtml
  );
  const [coverUrl, setCoverUrl] = useState<string>(coverPhoto || '');
  const [, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resetCount, setResetCount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    setCoverUrl(coverPhoto || '');
  }, [coverPhoto]);

  const enableCover = () => {
    setCoverUrl(
      'https://1t2k916rlb.ufs.sh/f/600x5gkLzosPnUNBvKDWpMwiLVmF2Ques6DdPt0cgrvj4hln'
    );
  };

  const saveArticle = async () => {
    setLoading(true);

    setSuccess(false);

    try {
      const articleData = {
        title,
        coverPhoto: coverUrl,
        content: html,
      };

      console.log('Saving article:', articleData);

      await axios.post('http://localhost:3000/api/newsletters', articleData);

      setSuccess(true);
    } catch (error) {
      console.error('Failed to save article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = useCallback(() => {
    dispatch(resetHtml());
    setResetCount(prev => prev + 1);
  }, [dispatch]);

  const Editor = useMemo(
    () => dynamic(() => import('@/components/Editor'), { ssr: false }),
    []
  );

  useEffect(() => {
    dispatch(setCoverPhoto(coverUrl));
  }, [coverUrl]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 10000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [success]);

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
            value={title || ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              dispatch(setTitle(e.target.value));
            }}
          />
        </div>
        <Editor key={resetCount} />
        <div className="flex justify-end mb-4">
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset Editor
          </button>
          <button
            onClick={() => saveArticle()}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Save Article
          </button>
        </div>
        {success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">
              {' '}
              Your article has been saved.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteBlogPage;
