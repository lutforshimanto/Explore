import Image from 'next/image';
import React from 'react';

interface ViewCoverProps {
  url?: string;
}

const ViewCover: React.FC<ViewCoverProps> = ({ url }) => {
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
        </>
      )}
    </div>
  );
};

export default ViewCover;
