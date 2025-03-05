import React from 'react';

import SectionContainer from '@/components/common/containers/SectionContainer';

import HomePage from './ClientHome';

const page = () => {
  return (
    <div className=" bg-red-700">
      <SectionContainer className="text-center text-white font-bold px-2 py-[2px]">
        <h1>
          Whoever takes a path in search of knowledge, Allah will make easy for
          him a path to Paradise
        </h1>
      </SectionContainer>
      <HomePage />
    </div>
  );
};

export default page;
