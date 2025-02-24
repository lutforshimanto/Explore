import Image from 'next/image';
import React from 'react';

import { UploadButton } from '@/utils/uploadthing';

interface CoverProps {
  url?: string;
  // eslint-disable-next-line no-unused-vars
  setUrl: (_: string) => void;
}

const Cover: React.FC<CoverProps> = ({ url, setUrl }) => {
  return (
    <div
      className={`relative w-full h-[35vh] bg-neutral-300 group ${
        !url ? 'hidden' : ''
      }`}
    >
      {!!url && (
        <>
          <Image
            src={url}
            alt="Cover"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute w-[20%] h-[20%] right-0 bottom-0  flex justify-center items-center">
            <UploadButton
              className="w-fit opacity-0 group-hover:opacity-100 transition-opacity ut-allowed-content:hidden ut-button:bg-neutral-200 ut-button:hover:bg-neutral-300 ut-button:text-neutral-800 ut-button:transition-colors"
              endpoint="imageUploader"
              onClientUploadComplete={res => {
                console.log('Upload completed. Files: ', res);
                setUrl(res[0].ufsUrl);
              }}
              onUploadError={(error: Error) => {
                console.log('Upload ERROR. Details: ', error.message);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cover;
