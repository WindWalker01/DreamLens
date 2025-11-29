import React from 'react';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

const LoansServices = () => {
  const baseUrl = "https://www.homecredit.ph";
  const imgUrl = (path) => path.startsWith('http') ? path : `${baseUrl}${path}`;

  const services = [
    {
      title: "Product Loan",
      desc: "Get the gadgets and appliances you want with easy monthly installments.",
      icon: "https://www.homecredit.ph/dam/jcr:c34f542d-745a-4b1b-a269-5a3ea51a8b0d/mobile_phone_f1ffa19384.svg",
      color: "bg-blue-50"
    },
    {
      title: "Cash Loan",
      desc: "Get extra cash for your needs. Approval in as fast as 1 minute.",
      icon: "https://www.homecredit.ph/dam/jcr:d32b4646-fdd9-4b82-936f-c93064b78b27/cash_loan_09799dc90c.svg",
      color: "bg-green-50"
    },
    {
      title: "Credit Card",
      desc: "Shop, dine, and enjoy exclusive perks with the Home Credit Card.",
      icon: "https://www.homecredit.ph/dam/jcr:e98e2968-3843-41e9-9137-05708848d504/card.svg",
      color: "bg-red-50"
    },
    {
      title: "Qwarta",
      desc: "Additional spending limit for load, bills, and QR payments.",
      icon: "https://www.homecredit.ph/dam/jcr:3941c6dc-db24-4b0e-95cf-b6237d8fde45/Loan_paid.svg",
      color: "bg-yellow-50"
    }
  ];

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-[#E11931] py-20 px-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Financial Solutions Made for You</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">Flexible loans and services designed to help you achieve your goals.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 flex items-start gap-6">
                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center flex-shrink-0`}>
                  <img src={service.icon} alt={service.title} className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                  <button className="text-[#E11931] font-bold hover:underline flex items-center gap-2">
                    Learn More 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">How it Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">1</div>
                <h4 className="text-xl font-bold mb-2">Download the App</h4>
                <p className="text-gray-600">Install the My Home Credit App from Google Play or App Store.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">2</div>
                <h4 className="text-xl font-bold mb-2">Submit Requirements</h4>
                <p className="text-gray-600">Upload 1 valid ID and fill out the application form.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">3</div>
                <h4 className="text-xl font-bold mb-2">Get Approved</h4>
                <p className="text-gray-600">Wait for approval in as fast as 1 minute and claim your loan.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoansServices;