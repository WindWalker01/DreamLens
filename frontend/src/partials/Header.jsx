import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const baseUrl = "https://www.homecredit.ph";

  const imgUrl = (path) => {
    if (path.startsWith('http')) return path;
    return `${baseUrl}${path}`;
  };

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return isActive 
      ? "text-[#E11931] font-medium transition-colors" 
      : "text-gray-700 hover:text-[#E11931] font-medium transition-colors";
  };

  const getMobileLinkClass = (path) => {
    const isActive = location.pathname === path;
    return isActive 
      ? "block text-[#E11931] font-bold" 
      : "block text-gray-700 font-medium";
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" title="Home Credit" className="flex-shrink-0">
              <img
                src={imgUrl("/dam/jcr:f8f42554-077c-4929-9d73-51d70c9ef9fd/hc-logo.svg")}
                alt="Home Credit"
                className="w-24 h-auto"
              />
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              <Link className={getLinkClass('/')} to="/">Home</Link>
              <Link className={getLinkClass('/products')} to="/products">Products</Link>
              <Link className={getLinkClass('/loans-services')} to="/loans-services">Loans & Services</Link>
              <Link className={getLinkClass('/promos')} to="/promos">Promos</Link>
              <Link className={getLinkClass('/about-us')} to="/about-us">About Us</Link>
              <Link className={getLinkClass('/help-center')} to="/help-center">Help Center</Link>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <Link className="text-[#E11931] font-medium cursor-pointer hover:underline" to="/login">
                Login
              </Link>
              <Link className="bg-[#E11931] text-white px-5 py-2.5 rounded-md font-semibold hover:bg-red-700 transition-colors" to="/register">
                Register
              </Link>
            </div>

            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-3 flex flex-col">
            <Link to="/" className={getMobileLinkClass('/')}>Home</Link>
            <Link to="/products" className={getMobileLinkClass('/products')}>Products</Link>
            <Link to="/loans-services" className={getMobileLinkClass('/loans-services')}>Loans & Services</Link>
            <Link to="/promos" className={getMobileLinkClass('/promos')}>Promos</Link>
            <Link to="/about-us" className={getMobileLinkClass('/about-us')}>About Us</Link>
            <Link to="/help-center" className={getMobileLinkClass('/help-center')}>Help Center</Link>
            <Link to="/login" className={getMobileLinkClass('/login')}>Login</Link>
            <Link to="/register" className={getMobileLinkClass('/register')}>Register</Link>
          </div>
        )}
      </header>
  );
};

export default Header;