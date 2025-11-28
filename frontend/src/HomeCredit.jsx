import React, { useState } from 'react';

const HomeCredit = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const baseUrl = "https://www.homecredit.ph";

  const imgUrl = (path) => {
    if (path.startsWith('http')) return path;
    return `${baseUrl}${path}`;
  };

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" title="Home Credit" className="flex-shrink-0">
              <img
                src={imgUrl("/dam/jcr:f8f42554-077c-4929-9d73-51d70c9ef9fd/hc-logo.svg")}
                alt="Home Credit"
                className="w-24 h-auto"
              />
            </a>

            <div className="hidden lg:flex items-center space-x-8">
              <a className="text-gray-700 hover:text-[#E11931] font-medium transition-colors" href="/">Home</a>
              <span className="text-gray-700 hover:text-[#E11931] font-medium cursor-pointer transition-colors">Loans & Services</span>
              <span className="text-gray-700 hover:text-[#E11931] font-medium cursor-pointer transition-colors">Shop</span>
              <a className="text-gray-700 hover:text-[#E11931] font-medium transition-colors" href="/promos">Promos</a>
              <a className="text-gray-700 hover:text-[#E11931] font-medium transition-colors" href="/stories">Blog</a>
              <span className="text-gray-700 hover:text-[#E11931] font-medium cursor-pointer transition-colors">About Us</span>
              <span className="text-gray-700 hover:text-[#E11931] font-medium cursor-pointer transition-colors">Help Center</span>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <a className="bg-[#E11931] text-white px-5 py-2.5 rounded-md font-semibold hover:bg-red-700 transition-colors" href="/download-online-loan-app">
                Get the App
              </a>
              <span className="text-[#E11931] font-medium cursor-pointer hover:underline">
                Account
              </span>
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
            <a className="block text-gray-700 font-medium" href="/">Home</a>
            <span className="block text-gray-700 font-medium">Loans & Services</span>
            <span className="block text-gray-700 font-medium">Shop</span>
            <a className="block text-gray-700 font-medium" href="/promos">Promos</a>
            <a className="block text-gray-700 font-medium" href="/stories">Blog</a>
            <a className="block w-full text-center bg-[#E11931] text-white px-5 py-2.5 rounded-md font-semibold" href="/download-online-loan-app">
              Get the App
            </a>
          </div>
        )}
      </header>

      <main className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[10%] left-[50%] w-[400px] h-[400px] bg-[#FF1E50] blur-[120px] opacity-10 rounded-full transform -translate-x-1/2"></div>
          <div className="absolute top-[30%] left-[80%] w-[350px] h-[350px] bg-[#00B8FF] blur-[100px] opacity-10 rounded-full transform -translate-x-1/2"></div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <img 
                src={imgUrl("/.imaging/mte/hc-theme/1400/dam/HCPH-Corpweb/Redesign/download-app.webp/jcr:content/download-app.webp")} 
                alt="download app" 
                className="w-full max-w-md h-auto object-contain"
              />
            </div>

            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-6">
                Get the <span className="text-[#E11931]">mobile phone</span>
                <span className="block mt-2">you've always wanted with Home Credit</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Download the Home Credit App and apply in minutes — fast and easy!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <a
                  href="#"
                  className="w-full sm:w-auto bg-[#E11931] hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Download Home Credit App
                </a>
              </div>
              
              <div className="flex justify-center lg:justify-start gap-4 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                 <a href="#"><img src={imgUrl("/dam/jcr:4632da42-2d7d-4aa8-9f93-8ad8f413a0a2/download-app-ios.svg")} alt="App Store" className="h-8 w-auto"/></a>
                 <a href="#"><img src={imgUrl("/dam/jcr:d1a37bf6-bc3b-4054-98d9-6a0148b250d1/download-app-playstore.svg")} alt="Play Store" className="h-8 w-auto"/></a>
                 <a href="#"><img src={imgUrl("/dam/jcr:2abb4c0a-2214-42f9-bd95-1bb909b68260/download-app-huawei.svg")} alt="AppGallery" className="h-8 w-auto"/></a>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-[#E5F3FB] rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { title: "Cash Loan", icon: "/dam/jcr:d32b4646-fdd9-4b82-936f-c93064b78b27/cash_loan_09799dc90c.svg" },
                { title: "Shoppingmall.ph", icon: "/dam/jcr:5cad5895-eb9f-4bc7-8dfc-2b4bcc518b84/shoppingmallph_ffa4a424d9.svg" },
                { title: "Download App", icon: "/dam/jcr:3366fc01-858e-4a82-b0b6-5ba73a65c169/download.svg" },
                { title: "Product Loan", icon: "/dam/jcr:c34f542d-745a-4b1b-a269-5a3ea51a8b0d/mobile_phone_f1ffa19384.svg" },
                { title: "Sign Contract", icon: "/dam/jcr:78acaacd-798a-4cf3-a8a7-ec1df74a84bf/sign_3d50966da6%20(1).svg" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center justify-center text-center group cursor-pointer">
                  <div className="bg-white p-3 rounded-full shadow-sm group-hover:shadow-md transition-shadow mb-3">
                    <img src={imgUrl(item.icon)} alt={item.title} className="h-10 w-10 object-contain" />
                  </div>
                  <span className="font-semibold text-gray-800 text-sm md:text-base">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-[#E5F3FB] rounded-2xl overflow-hidden flex flex-col lg:flex-row">
            <div className="hidden lg:block lg:w-1/2">
              <img 
                src={imgUrl("/.imaging/mte/hc-theme/1400/dam/HCPH-Corpweb/homepage/why-home-credit.webp/jcr:content/why-home-credit.webp")} 
                alt="Why Home Credit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Why choose Home Credit for your installment loans?</h2>
              <ul className="space-y-4 mb-8">
                {["Lowest interest & monthly rates", "Flexible payment options", "Fast & easy application process"].map((text, i) => (
                  <li key={i} className="flex items-start">
                    <img src={imgUrl("/dam/jcr:a87e1485-8cca-40e4-b931-0769a23f619b/approve.svg")} alt="check" className="w-6 h-6 mr-3 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{text}</span>
                  </li>
                ))}
              </ul>
              <button className="self-start bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Get Installments
              </button>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-[#FFEAEC] rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Estimate your loan in seconds</h2>
                <p className="text-gray-600 mb-8 text-lg">Get a quick, approximate idea for your loan options – no commitment, just clarity.</p>
                <ul className="space-y-3">
                  {["Low and flexible payment rates", "17,000+ partner stores", "0% interest options", "Fast and easy application"].map((text, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <img src={imgUrl("/dam/jcr:a87e1485-8cca-40e4-b931-0769a23f619b/approve.svg")} alt="check" className="w-5 h-5 mr-3" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Choose a product or enter amount</h5>
                    <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E11931]" min="1000" max="120000" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Enter down payment</h5>
                    <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E11931]" min="0" max="100" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Select monthly installment plans</h5>
                    <div className="flex gap-3">
                      {[6, 9, 12].map(m => (
                        <button key={m} className="w-12 h-12 rounded-full border border-gray-300 hover:border-[#E11931] hover:text-[#E11931] flex items-center justify-center font-medium transition-colors">
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <a href="/download-online-loan-app" className="block w-full bg-[#E11931] hover:bg-red-700 text-white text-center py-3 rounded-lg font-semibold transition-colors">
                    Download Home Credit App
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Four simple requirements for first-time loan applicants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Filipino Citizen", desc: "Must be a Filipino Citizen, age 18-68 years old", icon: "/dam/jcr:c781c0fa-ce04-4baf-ab81-d71dc3a784bf/Single.svg" },
              { title: "1 Primary ID", desc: "Must have one primary ID that contains your current address.", icon: "/dam/jcr:bea332fe-dc2a-4aef-8aa7-46b8433b858f/ID%20Proof.svg" },
              { title: "Source of Income", desc: "Must have an income from reliable sources.", icon: "/dam/jcr:3941c6dc-db24-4b0e-95cf-b6237d8fde45/Loan_paid.svg" },
              { title: "Qualified", desc: "Customers with Ongoing Loans are Qualified", icon: "/dam/jcr:f2c299a5-da6e-4235-966d-6967fa8890d5/Paying%20guest.svg" },
            ].map((req, i) => (
              <div key={i} className="flex flex-row lg:flex-col items-start p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <img src={imgUrl(req.icon)} alt={req.title} className="w-10 h-10 mr-4 lg:mb-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{req.title}</h4>
                  <p className="text-sm text-gray-600">{req.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-[#E11931] rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-2/3">
                <h1 className="text-4xl font-bold text-[#ffdc50] mb-2">Get the Home Credit App!</h1>
                <p className="text-lg opacity-90 mb-6">Online loan app from the Philippines' trusted lending company.</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={imgUrl("/dam/jcr:fe628c1c-f941-423f-8f95-194878baf38a/download-app-benefits.svg")} alt="check" className="w-6 h-6" />
                    <span className="font-medium">FLEXIBLE installments as low as 0% INTEREST</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src={imgUrl("/dam/jcr:fe628c1c-f941-423f-8f95-194878baf38a/download-app-benefits.svg")} alt="check" className="w-6 h-6" />
                    <span className="font-medium">Score exclusive DEALS and DISCOUNTS</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 flex justify-center">
                <img 
                  src={imgUrl("/dam/jcr:ccbfbfd6-e30a-4294-b67c-115b88db2e15/Home_Credit_New.webp")} 
                  alt="Phone App" 
                  className="w-full max-w-[280px] object-contain drop-shadow-xl" 
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
              <img src={imgUrl("/dam/jcr:f8f42554-077c-4929-9d73-51d70c9ef9fd/hc-logo.svg")} alt="Home Credit" className="w-24 mb-4" />
              <p className="text-xs text-gray-500">CORPORATE NAME: HC CONSUMER FINANCE PHILIPPINES, INC.</p>
            </div>
            
            <div>
              <h6 className="font-bold text-gray-900 mb-4">What We Offer?</h6>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#E11931]">Product Loans</a></li>
                <li><a href="#" className="hover:text-[#E11931]">Cash Loans</a></li>
                <li><a href="#" className="hover:text-[#E11931]">Credit Card</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-bold text-gray-900 mb-4">For Customers</h6>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#E11931]">FAQs</a></li>
                <li><a href="#" className="hover:text-[#E11931]">Privacy Notice</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-bold text-gray-900 mb-4">About Us</h6>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#E11931]">Careers</a></li>
                <li><a href="#" className="hover:text-[#E11931]">Our Offices</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-xs text-gray-500 leading-relaxed max-w-4xl mx-auto">
              Home Credit Philippines is regulated by the Bangko Sentral ng Pilipinas. <br className="hidden md:inline"/>
              SEC Reg. Number: CS201301354. Please read carefully the terms and conditions before proceeding with a loan transaction.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeCredit;