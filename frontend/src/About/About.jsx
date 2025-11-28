import React from 'react';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

const About = () => {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="relative h-[500px] overflow-hidden">
            <div className="absolute inset-0 bg-gray-900/40 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80" 
              alt="Office" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-wider mb-6 uppercase">
                        Since 2013
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">Empowering Every Filipino</h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
                        Building a financially inclusive future through technology and heart.
                    </p>
                </div>
            </div>
        </div>

        <div className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Home Credit Philippines is the leading consumer finance technology provider in the country. We are writing a new chapter in financial history by providing affordable, accessible, and transparent installment loans for gadgets, appliances, furniture, and more.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Customers Served", value: "10M+", color: "text-[#E11931]", bg: "bg-red-50" },
                        { label: "Partner Stores", value: "15K+", color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "Employees", value: "12K+", color: "text-purple-600", bg: "bg-purple-50" },
                        { label: "Provinces Covered", value: "81", color: "text-green-600", bg: "bg-green-50" },
                    ].map((stat, index) => (
                        <div key={index} className={`${stat.bg} rounded-3xl p-8 text-center transition-transform hover:-translate-y-1 duration-300`}>
                            <h3 className={`text-4xl md:text-5xl font-extrabold ${stat.color} mb-2`}>{stat.value}</h3>
                            <p className="text-gray-600 font-medium text-sm uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">These principles guide every decision we make and every interaction we have.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-8">
                            <svg className="w-8 h-8 text-[#E11931]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Fairness</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We believe in transparency. No hidden fees, no fine print surprises. We treat every customer with the respect and integrity they deserve.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
                            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We constantly challenge the status quo. By leveraging technology, we make financial services faster, easier, and more accessible for everyone.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-8">
                            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Inclusion</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Financial freedom shouldn't be a privilege. We are committed to bringing unbanked and underserved Filipinos into the formal financial system.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-[#E11931] py-20 px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your journey with us?</h2>
                <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto">Join millions of Filipinos who trust Home Credit for their financial needs.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-white text-[#E11931] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">
                        Download the App
                    </button>
                    <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
                        View Careers
                    </button>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;