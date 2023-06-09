import React from 'react';

// import data
import { join } from '../data';
import { Link } from 'react-router-dom';

const Join = () => {
  // destructure join data
  const { image, title, subtitle, btnText } = join;
  return (
    <section className='bg-primary-400 min-h-[537px]'>
      <div className='container mx-auto'>
        {/* image & text wrapper */}
        <div className='flex flex-col md:flex-row md:items-center md:-space-x-12 -space-y-24 lg:-space-y-0'>
          {/* image */}
          <div
            className='-mt-[80px] max-w-[276px] md:max-w-[442px] lg:max-w-full'
            data-aos='fade-right'
            data-aos-offset='100'
            data-aos-delay='200'
          >
            <img src={image} alt='' />
          </div>
          {/* text */}
          <div
            className='max-w-[350px] lg:max-w-[492px] ml-[30px]'
            data-aos='fade-left'
            data-aos-offset='100'
            data-aos-delay='200'
          >
            <h2 className='h1 md:text-[60px] md:leading-[62px] text-white mb-4 lg:mb-6'>
              Let'<span className='text-primary-200'>s</span> kickoff training<span className='text-primary-200'>!</span>
            </h2>
            <p className='text-body-sm md:text-body-md text-white mb-4 lg:mb-6 max-w-[348px] md:max-w-[470px] lg:max-w-[492px]'>
              {subtitle}
            </p>
            <Link to='/signup'>
            <button className='btn btn-secondary btn-lg'>{btnText}</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
