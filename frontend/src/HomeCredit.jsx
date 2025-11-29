import React, { useState, useEffect } from 'react';
import Header from './partials/Header';
import Footer from './partials/Footer';
import { Highlighter } from "@/components/ui/highlighter.jsx"

const HomeCredit = () => {
  const [prompt, setPrompt] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [resultImage, setResultImage] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loanAmount, setLoanAmount] = useState(50000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [term, setTerm] = useState(12);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = "https://www.homecredit.ph";

  const imgUrl = (path) => {
    if (path.startsWith('http')) return path;
    return `${baseUrl}${path}`;
  };

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const normalizedPrompt = prompt.trim().toLowerCase();
    const apiBaseUrl = import.meta.env.VITE_BACKEND_API_URL;

    if (apiBaseUrl) {
      try {
        const response = await fetch(`${apiBaseUrl}/test/prompt-builder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "prompt": prompt }),
        });
        if (!response.ok) {
          throw new Error(`Optimized Prompt generation failed (${response.status})`);
        }
        const data = await response.json();
        
        let effectivePrompt = prompt;
        if (data.prompt) {
          setOptimizedPrompt(data.prompt);
          effectivePrompt = data.prompt;
        } else {
          setOptimizedPrompt(prompt);
        }

        const responseImage = await fetch(`${apiBaseUrl}/chat/imagine`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "prompt": effectivePrompt }),
        });
        const dataImage = await responseImage.json();
        setResultImage(dataImage.image);

        if (Array.isArray(data.similar_products)) {
          setSimilarProducts(data.similar_products);
          return; 
        }
      } catch (error) {
        console.error('Error', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }

    if (!normalizedPrompt) {
      setSimilarProducts(products.slice(0, 4));
      return;
    }

    const matches = products.filter((product) => {
      const name = product.name.toLowerCase();
      const category = product.category.toLowerCase();
      return (
        name.includes(normalizedPrompt) ||
        category.includes(normalizedPrompt)
      );
    });

    setSimilarProducts(matches.length > 0 ? matches : products.slice(0, 4));
  };

  const calculateMonthlyPayment = () => {
    const downPayment = loanAmount * (downPaymentPercent / 100);
    const financedAmount = loanAmount - downPayment;
    const monthlyInterestRate = 0.0349;
    const totalInterest = financedAmount * monthlyInterestRate * term;
    const totalAmount = financedAmount + totalInterest;
    return Math.round(totalAmount / term);
  };

  const formatCurrency = (value) => {
    return "₱ " + value.toLocaleString();
  };

  const placeholderOptions = [
    "Ask AI: 'What's the best installment plan for an iPhone?'",
    "Ask AI: 'I need a gaming laptop under ₱3,000 monthly'",
    "Ask AI: 'How do I apply for a cash loan?'",
    "Ask AI: 'Show me 0% interest refrigerator deals'",
    "Ask AI: 'What are the requirements for a loan?'"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderOptions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const products = [
    { id: 1, name: "iPhone 15 Pro", category: "Mobile", price: "₱76,990", image: "https://www.smappliance.com/cdn/shop/files/10176925_69d90ab4-e32e-4451-84cd-e45c31becbf0.jpg?v=1730348965" },
    { id: 2, name: "Samsung Galaxy S24 Ultra", category: "Mobile", price: "₱84,990", image: "https://i5.walmartimages.com/seo/Samsung-Galaxy-S24-Ultra-5G-SM-S928B-DS-256GB-12GB-RAM-Factory-Unlocked-GSM-Titanium-Violet_27c8a138-e673-4372-831a-744cb9511b5f.26c52035bd3a5280da10538de73f88ae.jpeg" },
    { id: 3, name: "MacBook Air M2", category: "Laptop", price: "₱69,990", image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665" },
    { id: 4, name: "Sony Bravia 55\" 4K TV", category: "Appliance", price: "₱32,999", image: "https://www.smappliance.com/cdn/shop/files/K-55S31P3_800x.jpg?v=1742438569" },
    { id: 5, name: "LG Inverter Refrigerator", category: "Appliance", price: "₱28,495", image: "https://emcor.com.ph/wp-content/uploads/2025/10/02-4-3-1-1.jpg" },
    { id: 6, name: "iPad Air 5", category: "Tablet", price: "₱39,990", image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=940&hei=1112&fmt=png-alpha&.v=1645065732688" },
    { id: 7, name: "Nintendo Switch OLED", category: "Gaming", price: "₱16,495", image: "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_400/ncom/en_US/switch/site-design-update/hardware/switch/nintendo-switch-oled-model-white-set/gallery/image01" },
    { id: 8, name: "Yamaha NMAX 155", category: "Motorcycle", price: "₱151,900", image: "https://d1hv7ee95zft1i.cloudfront.net/custom/motorcycle-model-photo/original/2025-yamaha-nmax-tech-max-67d9694f162e7.jpeg" },
  ];

  return (
    <div className="font-sans text-[#121212] overflow-x-hidden bg-white selection:bg-[#E11931] selection:text-white">
      <Header />

      <main className="relative">
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 border-4 border-[#E11931] border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-700 font-medium">
                Generating your personalized results...
              </p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[10%] left-[50%] w-[400px] h-[400px] bg-[#FF1E50] blur-[120px] opacity-10 rounded-full transform -translate-x-1/2"></div>
          <div className="absolute top-[30%] left-[80%] w-[350px] h-[350px] bg-[#00B8FF] blur-[100px] opacity-10 rounded-full transform -translate-x-1/2"></div>
        </div>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
            Your Financial Partner for <Highlighter action="underline" color="#E11931"> <span className="text-[#E11931]">Everything You Need</span></Highlighter>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            From gadgets to appliances, find the best installment plans tailored just for you. Ask our AI assistant to help you find what you're looking for.
          </p>

          <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handlePromptSubmit} className="relative">
              <div className="relative flex items-center w-full p-2 bg-white border border-gray-200 rounded-2xl shadow-lg focus-within:shadow-xl focus-within:border-[#E11931] transition-all">
                <div className="flex-shrink-0 pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400 text-lg transition-all duration-300"
                  placeholder={placeholderOptions[placeholderIndex]}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                  type="submit"
                  className="flex-shrink-0 bg-[#E11931] hover:bg-red-700 text-white rounded-xl p-3 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
              <span>Try asking:</span>
              <button
                onClick={() => setPrompt("Laptop under 40k")}
                className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
              >
                Laptop under 40k
              </button>
              <button
                onClick={() => setPrompt("Low interest loans")}
                className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
              >
                Low interest loans
              </button>
              <button
                onClick={() => setPrompt("Apply for cash loan")}
                className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
              >
                Apply for cash loan
              </button>
            </div>
          </div>
        </section>

        {(resultImage || similarProducts.length > 0) && (
          <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-24 animate-fade-in-up">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-[32px] p-6 lg:p-10 shadow-xl border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="w-full lg:w-5/12">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#121212] mb-4 leading-tight">
                    AI Analysis for: <br/> <span className="text-[#E11931]">{prompt || 'your request'}</span>
                  </h2>
                  <p className="text-gray-600 mb-6 text-lg">
                    Here’s an AI-generated visualization of what you’re looking for. You can refine your prompt above to adjust the results.
                  </p>
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm group">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                      {resultImage ? (
                        <img
                          src={resultImage}
                          alt="AI generated result"
                          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-gray-400 gap-3">
                            <svg className="w-12 h-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-medium">Image will appear here</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#E11931]"></div>
                        AI Generated Visualization
                      </span>
                      <span>Illustration purposes only</span>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-7/12">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-[#121212]">Recommended Products</h3>
                    <span className="bg-[#E11931]/10 text-[#E11931] text-xs font-bold px-3 py-1 rounded-full">{similarProducts.length} FOUND</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {similarProducts.map((product) => (
                      <div
                        key={product.id || product.name}
                        className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-red-100 transition-all duration-300 flex flex-col"
                      >
                        <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-xl bg-gray-50 p-4">
                          <img
                            src={product.image || product.image_url}
                            alt={product.name}
                            className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold tracking-wider text-gray-900 shadow-sm">
                            {product.category.toUpperCase()}
                          </div>
                        </div>
                        <div className="flex flex-col flex-grow">
                          <h4 className="text-base font-bold text-[#121212] mb-2 line-clamp-2 leading-snug group-hover:text-[#E11931] transition-colors">
                            {product.name}
                          </h4>
                          {product.price && (
                            <p className="text-[#E11931] font-bold text-lg mb-4">
                              {product.price}
                            </p>
                          )}
                          <button className="mt-auto w-full bg-gray-50 hover:bg-[#121212] hover:text-white text-[#121212] border border-gray-200 hover:border-[#121212] py-2.5 rounded-xl font-semibold text-sm transition-all duration-300">
                            Check Installment Plans
                          </button>
                        </div>
                      </div>
                    ))}
                    {similarProducts.length === 0 && (
                      <div className="col-span-full py-10 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                         <p className="text-gray-500 font-medium">No direct matches found. Try keywords like "iPhone", "Laptop", or "TV".</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 p-8 lg:p-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-6">
              {[
                { title: "Cash Loan", icon: "/dam/jcr:d32b4646-fdd9-4b82-936f-c93064b78b27/cash_loan_09799dc90c.svg" },
                { title: "Shoppingmall.ph", icon: "/dam/jcr:5cad5895-eb9f-4bc7-8dfc-2b4bcc518b84/shoppingmallph_ffa4a424d9.svg" },
                { title: "Download App", icon: "/dam/jcr:3366fc01-858e-4a82-b0b6-5ba73a65c169/download.svg" },
                { title: "Product Loan", icon: "/dam/jcr:c34f542d-745a-4b1b-a269-5a3ea51a8b0d/mobile_phone_f1ffa19384.svg" },
                { title: "Sign Contract", icon: "/dam/jcr:78acaacd-798a-4cf3-a8a7-ec1df74a84bf/sign_3d50966da6%20(1).svg" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center justify-center text-center group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-gray-100 rounded-full shadow-sm group-hover:shadow-[0_8px_20px_rgba(225,25,49,0.15)] group-hover:border-[#E11931]/20 flex items-center justify-center mb-4 transition-all duration-300">
                    <img src={imgUrl(item.icon)} alt={item.title} className="h-8 w-8 md:h-10 md:w-10 object-contain" />
                  </div>
                  <span className="font-bold text-[#121212] text-sm md:text-base group-hover:text-[#E11931] transition-colors">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-[#E5F3FB] rounded-[32px] overflow-hidden">
             <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
                   <h2 className="text-3xl lg:text-4xl font-bold text-[#121212] mb-8 leading-tight">
                     Why choose Home Credit for your installment loans?
                   </h2>
                   <ul className="space-y-5 mb-10">
                     {[
                       "Lowest interest & monthly rates",
                       "Flexible payment options",
                       "Fast & easy application process"
                     ].map((text, i) => (
                       <li key={i} className="flex items-center text-gray-800 font-semibold text-lg">
                           <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm flex-shrink-0">
                             <img src={imgUrl("/dam/jcr:a87e1485-8cca-40e4-b931-0769a23f619b/approve.svg")} alt="check" className="w-5 h-5" />
                           </div>
                           {text}
                       </li>
                     ))}
                   </ul>
                   <div>
                     <button className="bg-[#E11931] hover:bg-[#c4152a] text-white font-bold py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-red-900/20 transition-all duration-300">
                       Get Installments
                     </button>
                   </div>
                </div>
                <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-full">
                   <img 
                      src={imgUrl("/.imaging/mte/hc-theme/1400/dam/HCPH-Corpweb/homepage/why-home-credit.webp/jcr:content/why-home-credit.webp")} 
                      alt="Why Home Credit" 
                      className="absolute inset-0 w-full h-full object-cover" 
                   />
                </div>
             </div>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-[#FFEAEC] rounded-[32px] p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <img src={imgUrl("/dam/jcr:2e9f1f1a-fb9c-40c7-a533-cf6122a2923b/arrow.svg")} className="absolute bottom-10 left-[20%] w-32 opacity-50 hidden lg:block" alt=""/>
                <img src={imgUrl("/dam/jcr:571a947e-ab29-4058-aff3-04e9414323fe/star.svg")} className="absolute top-10 left-10 w-12 opacity-40 animate-spin-slow" alt=""/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#121212] mb-6">Estimate your loan in seconds</h2>
                <p className="text-gray-700 mb-10 text-xl font-light">Get a quick, approximate idea for your loan options – no commitment, just clarity.</p>
                <ul className="space-y-4">
                  {["Low and flexible payment rates", "17,000+ of partner stores nationwide", "0% interest options on select products", "Fast and easy application"].map((text, i) => (
                    <li key={i} className="flex items-center text-gray-800 font-medium">
                      <img src={imgUrl("/dam/jcr:a87e1485-8cca-40e4-b931-0769a23f619b/approve.svg")} alt="check" className="w-6 h-6 mr-3" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 md:p-10 rounded-[24px] shadow-2xl shadow-red-900/5">
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-4 items-end">
                      <h5 className="font-bold text-gray-900 text-lg">Loan Amount</h5>
                      <span className="font-bold text-[#E11931] text-2xl tracking-tight">{formatCurrency(loanAmount)}</span>
                    </div>
                    <input
                      type="range"
                      className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#E11931]"
                      min="1000"
                      max="120000"
                      step="1000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                        <span>₱1,000</span>
                        <span>₱120,000</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-4 items-end">
                      <h5 className="font-bold text-gray-900 text-lg">Down Payment</h5>
                      <span className="font-bold text-[#E11931] text-2xl tracking-tight">{downPaymentPercent}%</span>
                    </div>
                    <input
                      type="range"
                      className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#E11931]"
                      min="0"
                      max="50"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    />
                     <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                        <span>0%</span>
                        <span>50%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 font-medium bg-gray-50 p-2 rounded-lg border border-gray-100 inline-block">Note: Final down payment varies based on eligibility.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 mb-4 text-lg">Term (Months)</h5>
                    <div className="flex gap-2">
                      {[6, 9, 12, 18, 24].map(m => (
                        <button
                          key={m}
                          onClick={() => setTerm(m)}
                          className={`flex-1 h-12 rounded-xl border-2 ${term === m ? 'border-[#E11931] text-[#E11931] bg-red-50/50 font-bold' : 'border-gray-100 text-gray-500 hover:border-gray-300'} flex items-center justify-center transition-all text-sm`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
                    <p className="text-sm text-gray-500 mb-2 font-semibold uppercase tracking-wider">Estimated Monthly Payment</p>
                    <p className="text-4xl font-extrabold text-[#121212]">{formatCurrency(calculateMonthlyPayment())}</p>
                  </div>
                  <button className="block w-full bg-[#E11931] hover:bg-[#c4152a] text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-red-900/20 transition-all">
                    Download Home Credit App
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#121212]">Featured Products</h2>
              <p className="text-gray-600 mt-3 text-lg font-light">Discover popular items available for installment</p>
            </div>
            <a href="#" className="text-[#E11931] font-bold hover:underline flex items-center gap-1 group">
                View all products 
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col h-full group hover:-translate-y-1">
                <div className="relative aspect-square mb-6 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 shadow-sm border border-gray-200">
                    {product.category}
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-[#121212] mb-2 line-clamp-2 leading-snug group-hover:text-[#E11931] transition-colors">{product.name}</h3>
                  <p className="text-[#E11931] font-bold text-xl mb-6">{product.price}</p>
                  <div className="mt-auto pt-5 border-t border-gray-50">
                    <button className="w-full bg-[#121212] hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition-colors text-sm shadow-md">
                      Check Installment Plans
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#121212] mb-12 text-center">Four simple requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Filipino Citizen", desc: "Must be a Filipino Citizen, age 18-68 years old", icon: "/dam/jcr:c781c0fa-ce04-4baf-ab81-d71dc3a784bf/Single.svg" },
              { title: "1 Primary ID", desc: "Must have one primary ID that contains your current address.", icon: "/dam/jcr:bea332fe-dc2a-4aef-8aa7-46b8433b858f/ID%20Proof.svg" },
              { title: "Source of Income", desc: "Income from reliable sources such as employment or business.", icon: "/dam/jcr:3941c6dc-db24-4b0e-95cf-b6237d8fde45/Loan_paid.svg" },
              { title: "Ongoing Loans?", desc: "Existing customers with ending loans can re-apply.", icon: "/dam/jcr:f2c299a5-da6e-4235-966d-6967fa8890d5/Paying%20guest.svg" },
            ].map((req, i) => (
              <div key={i} className="flex flex-col items-start p-8 border border-gray-100 rounded-2xl bg-white hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-200 transition-all duration-300">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                    <img src={imgUrl(req.icon)} alt={req.title} className="w-8 h-8 flex-shrink-0" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#121212] mb-2">{req.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{req.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="bg-[#FFEAEC] rounded-[32px] p-8 lg:p-16">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#121212] mb-4">What Home Credit Means to Every Juan</h2>
                    <p className="text-gray-700 text-lg">Watch real-life stories of success featuring our Ka-HCs who trusted Home Credit.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { name: "Jeann Rose Orongan", type: "Home Credit Protect", quote: "Malaki po talaga ang naitulong ng Home Credit sa amin...", id: "7M73DV_SPhk" },
                        { name: "Amanda Guazon", type: "Cash Loan Customer", quote: "Sa tulong po ng Home Credit, nakapagpa-graduate na ako...", id: "woA8arvg74Q" },
                        { name: "Rowena Reserba", type: "Cash Loan Customer", quote: "Nakapundar po kami ng isang 4-wheel na sasakyan...", id: "p3jE56xdrU0" },
                        { name: "Angela San Jose", type: "Cash Loan Customer", quote: "Madaming pasasalamat kasi na-provide ko kailangan ng family...", id: "4anVpmgAPzQ" }
                    ].map((story, i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
                            <div className="aspect-video bg-black relative group">
                                <iframe 
                                    className="w-full h-full pointer-events-none" 
                                    src={`https://www.youtube.com/embed/${story.id}?controls=0&showinfo=0`} 
                                    title={story.name}
                                    loading="lazy"
                                ></iframe>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-4">
                                   <svg className="w-6 h-6 text-gray-300 mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.096 14.092 13.991 19.002 10.375L19.002 8C19.002 11.267 17.512 12.871 16.035 13.842C15.658 14.103 15.352 14.316 15.118 14.544C14.597 15.053 14.167 15.717 14.017 18ZM4.017 21L4.017 18C4.017 16.096 4.092 13.991 9.002 10.375L9.002 8C9.002 11.267 7.512 12.871 6.035 13.842C5.658 14.103 5.352 14.316 5.118 14.544C4.597 15.053 4.167 15.717 4.017 18Z"/></svg>
                                   <p className="text-gray-600 italic leading-relaxed text-sm">"{story.quote}"</p>
                                </div>
                                <div className="mt-auto border-t border-gray-100 pt-4">
                                    <p className="font-bold text-[#121212]">{story.name}</p>
                                    <p className="text-xs text-[#E11931] font-bold uppercase tracking-wide mt-1">{story.type}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-32">
            <h2 className="text-3xl font-bold text-[#121212] mb-4 text-center">Home Credit's Trust and Recognition</h2>
            <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">Recognized and awarded by the top award-giving bodies, both locally and internationally.</p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                {[
                    "ABF.webp/jcr:content/Logo_02%20(1).webp",
                    "Asia-CEO-Awards.webp/jcr:content/asia-ceo-awards.webp",
                    "Anvil-Awards.webp/jcr:content/Logo_09%20(1).webp",
                    "Global-Banking-and-Finance-Awards.webp/jcr:content/Logo_05%20(1).webp",
                    "Asia-Pacific-Stevie-Awards.webp/jcr:content/Logo_03%20(1).webp",
                    "Gold-Standard-Awards-Public-Affairs-Asia.webp/jcr:content/the-gold-standard-awards.webp",
                    "IFM.webp/jcr:content/Logo_06%20(1).webp",
                    "HR-Excellence-Awards-Philippines.webp/jcr:content/hr%20awards.webp",
                    "Marketing-Excellence-Awards.webp/jcr:content/Logo_08%20(1).webp"
                ].map((logo, i) => (
                    <div key={i} className="group relative">
                        <img 
                          src={imgUrl(`/.imaging/mte/hc-theme/360/dam/HCPH-Corpweb/homepage/awards-logo/${logo}`)} 
                          alt="Award Logo" 
                          className="h-16 md:h-30 w-auto object-contain transition-all duration-500 filter" 
                        />
                    </div>
                ))}
            </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default HomeCredit;