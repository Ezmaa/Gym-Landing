import React from 'react';
import { Link } from 'react-scroll';

// import data
import { nav } from '../data';

const Nav = () => {
  return (
    <nav className='hidden lg:flex'>
      <ul className='flex gap-x-8 text-white'>
        {nav.map((item, idx) => {
          return (
            <li key={idx}>
              <Link 
                to={item.id} 
                className='hover:text-primary-200 cursor-pointer'
                spy={true}
                smooth={true}
                duration={1000}
                offset={-70}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
