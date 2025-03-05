import React from 'react';

import ImageUpload from '@/components/upload/ImageUpload';

const FileUploadPage = () => {
  return (
    <div className="flex flex-col items-center justify-start pt-8">
      <ImageUpload />
    </div>
  );
};

export default FileUploadPage;
