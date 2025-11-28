import React from 'react';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

const Promos = () => {
  const promos = [
    {
      id: 1,
      title: "0% Interest on iPhone 15",
      validity: "Until Dec 31, 2024",
      tag: "Mobile",
      bg: "bg-gray-900",
      text: "text-white"
    },
    {
      id: 2,
      title: "Back to School Laptop Deals",
      validity: "Until Aug 30, 2024",
      tag: "Laptops",
      bg: "bg-blue-600",
      text: "text-white"
    },
    {
      id: 3,
      title: "Summer Appliance Sale",
      validity: "Until May 15, 2024",
      tag: "Appliances",
      bg: "bg-[#E11931]",
      text: "text-white"
    },
    {
      id: 4,
      title: "Furniture Blowout",
      validity: "Until Oct 10, 2024",
      tag: "Furniture",
      bg: "bg-orange-500",
      text: "text-white"
    },
    {
      id: 5,
      title: "E-Bike Special Offer",
      validity: "Until Nov 20, 2024",
      tag: "Transportation",
      bg: "bg-green-600",
      text: "text-white"
    },
    {
      id: 6,
      title: "Gaming Console Bundle",
      validity: "Until Sep 15, 2024",
      tag: "Gaming",
      bg: "bg-purple-600",
      text: "text-white"
    }
  ];

  return (
    <div className="font-sans text-gray-900 bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Exclusive Promos & Deals</h1>
            <p className="text-gray-600 text-lg">Grab the hottest deals and 0% interest offers today!</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["All Promos", "0% Interest", "Mobile", "Laptops", "Appliances"].map(filter => (
              <button key={filter} className="px-6 py-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 hover:border-gray-300 transition-colors font-medium">
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promos.map((promo) => (
              <div key={promo.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100">
                <div className={`h-48 ${promo.bg} p-8 flex flex-col justify-center relative overflow-hidden`}>
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                   <span className="inline-block bg-white/20 backdrop-blur-sm self-start px-3 py-1 rounded-md text-xs font-bold text-white mb-4 border border-white/10">
                      {promo.tag}
                   </span>
                   <h3 className={`text-2xl font-bold ${promo.text} leading-tight relative z-10`}>{promo.title}</h3>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">{promo.validity}</span>
                  </div>
                  <p className="text-gray-600 mb-6 text-sm">
                    Enjoy flexible payment terms and low interest rates on this exclusive offer. Visit any partner store near you.
                  </p>
                  <button className="w-full py-3 border-2 border-gray-900 rounded-xl font-bold hover:bg-gray-900 hover:text-white transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Promos;