import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';

// import header data
import { header } from '../data';

// import components
import Nav from '../components/Nav';
import NavMobile from './NavMobile';

// import icons
import { RiMenu4Fill, RiCloseFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [navMobile, setNavMobile] = useState(false);

  useEffect(() => {
    // scroll event
    window.addEventListener('scroll', () => {
      window.scrollY > 80 ? setIsActive(true) : setIsActive(false);
    });
  });

  // destructure header data
  const { logo, btnLoginText, btnSignupText, btnSignoutText } = header;
  // header while signed out
  if (!Auth.loggedIn()) {
    return (
      <header
        className={`${
          isActive ? 'bg-primary-400 py-[14px]' : 'bg-primary-400 py-[20px]'
        } fixed max-w-[1440px] left-0 right-0 mx-auto flex justify-between items-center px-[20px] lg:px-[80px] z-30 transition-all duration-300`}
      >
        {/* logo */}
        <a href='/'>
          <img className='h-[30px]' src={logo} alt='' />
        </a>

        {/* nav - initially hidden - show in desktop mode */}
        <Nav />

        {/* buttons - initally hidden - show in desktop mode */}
        <div className='hidden lg:flex space-x-4'>
          <Link to='/login'>
            <button className='btn btn-sm text-white hover:text-primary-200 transition'>
              {btnLoginText}
            </button>
          </Link>
          <Link to='/signup'>
            <button className='btn btn-sm btn-primary'>{btnSignupText}</button>
          </Link>
        </div>

        {/* nav menu button - hide on desktop */}
        <div
          onClick={() => setNavMobile(!navMobile)}
          className='lg:hidden absolute right-4'
        >
          {navMobile ? (
            <RiCloseFill className='text-3xl text-primary-200 cursor-pointer' />
          ) : (
            <RiMenu4Fill className='text-3xl text-primary-200 cursor-pointer' />
          )}
        </div>

        {/* nav mobile - hide on desktop */}
        <NavMobile navMobile={navMobile} />
      </header>
    );
  };
  // Header while signed in
  return (
    <header
        className={`${
          isActive ? 'bg-primary-400 py-[14px]' : 'bg-primary-400 py-[20px]'
        } fixed max-w-[1440px] left-0 right-0 mx-auto flex justify-between items-center px-[20px] lg:px-[80px] z-30 transition-all duration-300`}
      >
        {/* logo */}
        <a href='/'>
          <img className='h-[30px]' src={logo} alt='' />
        </a>

        {/* nav - initially hidden - show in desktop mode */}
        <Nav />

        {/* buttons - initally hidden - show in desktop mode */}
        <div className='hidden lg:flex space-x-4'>
          <Link onClick={Auth.logout} to='/'>
            <button className='btn btn-sm text-white hover:text-primary-200 transition'>
              {btnSignoutText}
            </button>
          </Link>
        </div>

        {/* nav menu button - hide on desktop */}
        <div
          onClick={() => setNavMobile(!navMobile)}
          className='lg:hidden absolute right-4'
        >
          {navMobile ? (
            <RiCloseFill className='text-3xl text-primary-200 cursor-pointer' />
          ) : (
            <RiMenu4Fill className='text-3xl text-primary-200 cursor-pointer' />
          )}
        </div>

        {/* nav mobile - hide on desktop */}
        <NavMobile navMobile={navMobile} />
      </header>
  );
};

export default Header;
