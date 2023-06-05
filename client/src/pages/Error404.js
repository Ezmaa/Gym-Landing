import React from 'react';
import {error404} from '../data';

const Error404 = (props) => {
  return (
    <main className='flex-row justify-center flex-row justify-center lg:pt-[140px] max-w-[1440px] mx-auto overflow-hidden relative'>
     <h1>{error404.ErrorMessage}</h1>
    </main>
  );
};

export default Error404;
