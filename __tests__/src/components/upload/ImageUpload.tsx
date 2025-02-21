'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import type { RootState } from '@/redux/store';

import { UploadDropzone } from '@/utils/uploadthing';
import { setImageUrl, removeImage } from '@/redux/uploaded-files';

import { CircleX } from 'lucide-react';

const ImageUpload = () => {
  const dispatch = useDispatch();
  const imageUrl = useSelector(
    (state: RootState) => state.uploadedFiles.imageUrl
  );

  const handleRemoveImage = () => {
    dispatch(removeImage());
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <UploadDropzone
        endpoint="imageUploader"
        className="border-dashed border-2 border-gray-300 rounded-lg"
        onClientUploadComplete={res => {
          dispatch(setImageUrl(res[0].ufsUrl));
        }}
        onUploadError={(error: Error) => {
          console.log(error.message);
        }}
      />
      {imageUrl ? (
        <div className="mt-8 space-y-4 bg-gray-50 rounded-xl p-6 shadow-sm relative group">
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-gray-400 text-white w-6 h-6 rounded-full 
            flex items-center justify-center hover:bg-red-700 transition-all duration-200 
            shadow-md opacity-0 group-hover:opacity-100"
            aria-label="Remove image"
          >
            <CircleX size={24} />
          </button>
          <div className="mt-2">
            <Image
              src={imageUrl}
              alt="Uploaded Image"
              width={500}
              height={300}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageUpload;
