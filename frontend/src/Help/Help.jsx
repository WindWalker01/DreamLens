import React, { useState } from 'react';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

const Help = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTab = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

  const faqs = [
    { q: "How do I apply for a loan?", a: "You can apply by visiting any partner store with 1 valid ID, or by downloading the My Home Credit App to start your application online." },
    { q: "Where can I pay my installments?", a: "You can pay via the App, GCash, Maya, 7-Eleven, or any of our authorized payment partners nationwide." },
    { q: "What happens if I miss a payment?", a: "Late fees may apply. We encourage you to contact us immediately if you are having trouble making a payment to discuss repayment options." },
    { q: "How do I check my loan balance?", a: "Simply log in to the My Home Credit App to view your loan details, payment schedule, and transaction history in real-time." },
    { q: "Can I terminate my loan early?", a: "Yes, you can fully settle your loan before the term ends. Please contact customer service for the full payoff computation." },
  ];

  const quickLinks = [
    { 
        title: "Loan Status", 
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        desc: "Check application"
    },
    { 
        title: "Payments", 
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
        ),
        desc: "Ways to pay"
    },
    { 
        title: "Account", 
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
        desc: "Manage profile"
    },
    { 
        title: "Credit Card", 
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
        ),
        desc: "Card services"
    },
    { 
        title: "Promos", 
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
        ),
        desc: "Latest deals"
    },
    { 
        title: "Report Fraud", 
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        desc: "Secure account"
    }
  ];

  return (
    <div className="font-sans text-gray-900 bg-gray-50 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-gray-900 via-[#E11931] to-red-600 py-20 px-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 opacity-10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
            
            <div className="max-w-3xl mx-auto text-center relative z-10">
                <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold tracking-wider mb-6">SUPPORT CENTER</span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">How can we help you today?</h1>
                <p className="text-red-100 text-lg mb-10">Search our knowledge base or browse frequently asked questions.</p>
                
                <div className="relative max-w-2xl mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Type a question (e.g., 'How to pay', 'Reset password')" 
                        className="w-full pl-16 pr-24 py-5 rounded-2xl text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30 text-gray-900 placeholder-gray-500 bg-white/95 backdrop-blur transition-all"
                    />
                    <button className="absolute right-3 top-2.5 bottom-2.5 bg-gray-900 text-white px-6 rounded-xl font-semibold hover:bg-[#E11931] transition-colors duration-300">
                        Search
                    </button>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
            {/* Quick Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
                {quickLinks.map((topic, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center group border border-gray-100">
                        <div className="w-12 h-12 bg-red-50 text-[#E11931] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#E11931] group-hover:text-white transition-colors duration-300">
                            {topic.icon}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{topic.title}</h3>
                        <p className="text-xs text-gray-500">{topic.desc}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* FAQ Section */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                        <button className="text-[#E11931] font-semibold hover:underline text-sm">View all FAQs</button>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
                                <button 
                                    onClick={() => toggleTab(index)}
                                    className="w-full px-8 py-6 text-left flex justify-between items-start gap-4"
                                >
                                    <span className={`font-bold text-lg transition-colors ${activeTab === index ? 'text-[#E11931]' : 'text-gray-800'}`}>
                                        {faq.q}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${activeTab === index ? 'bg-red-100 text-[#E11931]' : 'bg-gray-100 text-gray-500'}`}>
                                        <svg className={`w-5 h-5 transition-transform duration-300 ${activeTab === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                                <div 
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                        activeTab === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="px-8 pb-8 text-gray-600 leading-relaxed">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Cards */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in touch</h2>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Call Us</h4>
                                <p className="text-sm text-gray-500 mb-3">Speak with our customer service team.</p>
                                <a href="tel:0277535777" className="text-[#E11931] font-bold hover:underline">(02) 7753 5777</a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Live Chat</h4>
                                <p className="text-sm text-gray-500 mb-3">Chat with us for quick answers.</p>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Available 8AM - 8PM
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
                                <p className="text-sm text-gray-500 mb-3">Send us your detailed concerns.</p>
                                <a href="mailto:info@homecredit.ph" className="text-[#E11931] font-bold hover:underline">info@homecredit.ph</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;