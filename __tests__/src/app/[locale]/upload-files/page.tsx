import ImageUpload from '@/components/upload/ImageUpload';
import React from 'react';

const FileUploadPage = () => {
  return (
    <div className="flex flex-col items-center justify-start pt-8">
      <ImageUpload />
    </div>
  );
};

export default FileUploadPage;
