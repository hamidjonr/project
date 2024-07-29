import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Create the breadcrumb links
  const crumbs = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

    return (
      <li key={to} className="breadcrumb-item">
        <Link 
          to={to} 
          className="serchbtn text-xl font-semibold text-[#000] no-underline hover:no-underline flex items-center gap-2 hover:text-[#8c938f]"
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Link>
        {index < pathnames.length - 1 && (
          <span className="mx-2 text-gray-500">/</span>
        )}
      </li>
    );
  });

  return (
    <nav aria-label="breadcrumb" className='bg-white'>
      <ol className="flex max-w-[1090px] mx-auto mt-6">
        <li className="breadcrumb-item">
          <Link 
            to="/" 
            className="serchbtn text-xl font-semibold text-[#000] no-underline hover:no-underline flex items-center gap-2 hover:text-[#8c938f]"
          >
            <FaHome />
            Home
          </Link>
        </li>
        {crumbs}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
