'use client';

import Cover from '@/components/Cover';
import dynamic from 'next/dynamic';
import { useState, useMemo } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { useDispatch, useSelector } from 'react-redux';
import { setHtml } from '@/redux/newsletterhtml';
import type { RootState } from '@/redux/store';

const WriteBlogPage = () => {
  const [coverUrl, setCoverUrl] = useState<string>();
  const dispatch = useDispatch();
  const { html } = useSelector((state: RootState) => state.newsletterHtml);

  //   const enableCover = async () => {
  //     const randomImage = await fetch('https://source.unsplash.com/random');
  //     setCoverUrl(randomImage.url);
  //   };

  const enableCover = () => {
    setCoverUrl(
      'https://1t2k916rlb.ufs.sh/f/600x5gkLzosPnUNBvKDWpMwiLVmF2Ques6DdPt0cgrvj4hln'
    );
  };

  const Editor = useMemo(
    () => dynamic(() => import('@/components/Editor'), { ssr: false }),
    []
  );

  return (
    <div>
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
          />
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default WriteBlogPage;
