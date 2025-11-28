import React from 'react';

const Footer = () => {
  const baseUrl = "https://www.homecredit.ph";

  const imgUrl = (path) => {
    if (path.startsWith('http')) return path;
    return `${baseUrl}${path}`;
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
              <img src={imgUrl("/dam/jcr:f8f42554-077c-4929-9d73-51d70c9ef9fd/hc-logo.svg")} alt="Home Credit" className="w-24 mb-4" />
              <p className="text-xs text-gray-500">CORPORATE NAME: HC CONSUMER FINANCE PHILIPPINES, INC.</p>
            </div>
            
            <div>
              <h6 className="font-bold text-gray-900 mb-4">Products</h6>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#E11931]">Mobile Phones</a></li>
                <li><a href="#" className="hover:text-[#E11931]">Laptops</a></li>
                <li><a href="#" className="hover:text-[#E11931]">Appliances</a></li>
                <li><a href="#" className="hover:text-[#E11931]">Furniture</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-bold text-gray-900 mb-4">Services</h6>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#E11931]">Product Loans</a></li>
                <li><a href="#" className="hover:text-[#E11931]">Cash Loans</a></li>
                <li><a href="#" className="hover:text-[#E11931]">Credit Card</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-bold text-gray-900 mb-4">Support</h6>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#E11931]">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#E11931]">FAQs</a></li>
                <li><a href="#" className="hover:text-[#E11931]">Privacy Notice</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 text-center">
            <p className="text-xs text-gray-400 leading-relaxed max-w-4xl mx-auto">
              Home Credit Philippines is regulated by the Bangko Sentral ng Pilipinas. <br className="hidden md:inline"/>
              SEC Reg. Number: CS201301354. Please read carefully the terms and conditions before proceeding with a loan transaction.
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;