import React, { useState, useEffect } from 'react';
import Header from './partials/Header';
import Footer from './partials/Footer';

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
    console.log("User prompt:", prompt);
    setIsLoading(true);

    // Temporary demo behavior:
    // - Show a generated image from the backend cache (can be replaced with real API response)
    // - Derive "similar products" by matching the prompt against product names / categories
    const normalizedPrompt = prompt.trim().toLowerCase();

    // In Vite, environment variables must be prefixed with VITE_ and accessed via import.meta.env
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
        console.log(data.prompt);

        // Use optimized prompt if provided
        let effectivePrompt = prompt;
        if (data.prompt) {
          setOptimizedPrompt(data.prompt);
          effectivePrompt = data.prompt;
        } else {
          console.error('No optimized prompt found');
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
        console.log(dataImage.image);
        setResultImage(dataImage.image);

        // Use the new JSON format to populate similar products, if available
        if (Array.isArray(data.similar_products)) {
          setSimilarProducts(data.similar_products);
          return; // Skip local demo-matching logic if backend provided products
        }
      } catch (error) {
        console.error('Error generating optimized prompt or similar products:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error('No API URL found');
      setIsLoading(false);
    }

    if (!normalizedPrompt) {
      // If no prompt text, just show a few featured products
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

    // Fallback: if nothing matches, still show a curated subset
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
    { id: 1, name: "iPhone 15 Pro", category: "Mobile", price: "₱76,990", image: "https://powermaccenter.com/cdn/shop/files/iPhone_15_Pro_Blue_Titanium_PDP_Image_Position-1__en-US_22107126-5b9e-4e4f-b633-899b24443e0d.jpg?v=1695948332" },
    { id: 2, name: "Samsung Galaxy S24 Ultra", category: "Mobile", price: "₱84,990", image: "https://images.samsung.com/is/image/samsung/p6pim/ph/2401/gallery/ph-galaxy-s24-s928-sm-s928bzqcphl-539299446?$650_519_PNG$" },
    { id: 3, name: "MacBook Air M2", category: "Laptop", price: "₱69,990", image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665" },
    { id: 4, name: "Sony Bravia 55\" 4K TV", category: "Appliance", price: "₱32,999", image: "https://www.sony.com.ph/image/3d683259966b93198f24458f381014e0?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF" },
    { id: 5, name: "LG Inverter Refrigerator", category: "Appliance", price: "₱28,495", image: "https://www.lg.com/ph/images/refrigerators/md07534444/gallery/D-01.jpg" },
    { id: 6, name: "iPad Air 5", category: "Tablet", price: "₱39,990", image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=940&hei=1112&fmt=png-alpha&.v=1645065732688" },
    { id: 7, name: "Nintendo Switch OLED", category: "Gaming", price: "₱16,495", image: "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_400/ncom/en_US/switch/site-design-update/hardware/switch/nintendo-switch-oled-model-white-set/gallery/image01" },
    { id: 8, name: "Yamaha NMAX 155", category: "Motorcycle", price: "₱151,900", image: "https://www.yamaha-motor.com.ph/uploads/product_assets/1643953648_NMAX_ICON_GRAY.png" },
  ];

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
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
            Your Financial Partner for <span className="text-[#E11931]">Everything You Need</span>
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
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="w-full lg:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  AI result for: <span className="text-[#E11931]">{prompt || 'your request'}</span>
                </h2>
                <p className="text-gray-600 mb-4">
                  Here’s an AI-generated visualization of what you’re looking for. You can refine your prompt above to adjust the results.
                </p>
                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                    {resultImage ? (
                      <img
                        src={resultImage}
                        alt="AI generated result"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">Image will appear here after you submit a prompt.</span>
                    )}
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    Image is for illustration purposes only. Actual products and offers may vary.
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Similar products for your prompt</h3>
                  <span className="text-sm text-gray-500">{similarProducts.length} item(s)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similarProducts.map((product) => (
                    <div
                      key={product.id || product.name}
                      className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex flex-col"
                    >
                      <div className="relative aspect-square mb-3 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
                        <img
                          src={product.image || product.image_url}
                          alt={product.name}
                          className="object-contain w-full h-full"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[11px] font-semibold text-gray-600 border border-gray-200">
                          {product.category}
                        </div>
                      </div>
                      <div className="flex flex-col flex-grow">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                          {product.name}
                        </h4>
                        {product.price && (
                          <p className="text-[#E11931] font-bold text-base mb-3">
                            {product.price}
                          </p>
                        )}
                        <button className="mt-auto w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg font-medium text-xs transition-colors">
                          View installment options
                        </button>
                      </div>
                    </div>
                  ))}
                  {similarProducts.length === 0 && (
                    <p className="text-sm text-gray-500 col-span-full">
                      No similar products found for this prompt yet. Try a different description like “iPhone”, “laptop”, or “TV”.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}



        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-[#E5F3FB] rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {[
                { title: "Cash Loan", icon: "/dam/jcr:d32b4646-fdd9-4b82-936f-c93064b78b27/cash_loan_09799dc90c.svg" },
                { title: "Mobiles", icon: "/dam/jcr:c34f542d-745a-4b1b-a269-5a3ea51a8b0d/mobile_phone_f1ffa19384.svg" },
                { title: "Appliances", icon: "/dam/jcr:5cad5895-eb9f-4bc7-8dfc-2b4bcc518b84/shoppingmallph_ffa4a424d9.svg" },
                { title: "Laptops", icon: "/dam/jcr:3366fc01-858e-4a82-b0b6-5ba73a65c169/download.svg" },
                { title: "Furniture", icon: "/dam/jcr:78acaacd-798a-4cf3-a8a7-ec1df74a84bf/sign_3d50966da6%20(1).svg" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center justify-center text-center group cursor-pointer">
                  <div className="bg-white p-4 rounded-full shadow-sm group-hover:shadow-md transition-shadow mb-3">
                    <img src={imgUrl(item.icon)} alt={item.title} className="h-8 w-8 object-contain" />
                  </div>
                  <span className="font-semibold text-gray-800 text-sm md:text-base">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-600 mt-2">Discover popular items available for installment</p>
            </div>
            <a href="#" className="text-[#E11931] font-semibold hover:underline hidden sm:block">View all products →</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-gray-600 border border-gray-200">
                    {product.category}
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-[#E11931] font-bold text-xl mb-4">{product.price}</p>
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-colors text-sm">
                      Check Installment Plans
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <a href="#" className="text-[#E11931] font-semibold hover:underline">View all products →</a>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-[#FFEAEC] rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Calculate Your Loan</h2>
                <p className="text-gray-600 mb-8 text-lg">Get a quick estimate of your monthly payments before you apply.</p>
                <ul className="space-y-3">
                  {["Low and flexible interest rates", "17,000+ partner stores nationwide", "0% interest deals on select items", "Approval in as fast as 1 minute"].map((text, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <img src={imgUrl("/dam/jcr:a87e1485-8cca-40e4-b931-0769a23f619b/approve.svg")} alt="check" className="w-5 h-5 mr-3" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-50">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <h5 className="font-semibold text-gray-900">Loan Amount</h5>
                      <span className="font-bold text-[#E11931]">{formatCurrency(loanAmount)}</span>
                    </div>
                    <input
                      type="range"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E11931]"
                      min="1000"
                      max="120000"
                      step="1000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <h5 className="font-semibold text-gray-900">Down Payment</h5>
                      <span className="font-bold text-[#E11931]">{downPaymentPercent}%</span>
                    </div>
                    <input
                      type="range"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E11931]"
                      min="0"
                      max="50"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Term (Months)</h5>
                    <div className="flex gap-3">
                      {[6, 9, 12, 18, 24].map(m => (
                        <button
                          key={m}
                          onClick={() => setTerm(m)}
                          className={`flex-1 h-10 rounded-lg border ${term === m ? 'border-[#E11931] text-[#E11931] bg-red-50' : 'border-gray-200 text-gray-600 hover:border-gray-300'} flex items-center justify-center font-medium transition-colors text-sm`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <p className="text-sm text-gray-500 mb-1">Estimated Monthly Payment</p>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(calculateMonthlyPayment())}</p>
                  </div>
                  <button className="block w-full bg-[#E11931] hover:bg-red-700 text-white text-center py-3 rounded-lg font-semibold transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Simple Application Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Filipino Citizen", desc: "Age 18-68 years old", icon: "/dam/jcr:c781c0fa-ce04-4baf-ab81-d71dc3a784bf/Single.svg" },
              { title: "1 Primary ID", desc: "Government issued ID with address", icon: "/dam/jcr:bea332fe-dc2a-4aef-8aa7-46b8433b858f/ID%20Proof.svg" },
              { title: "Source of Income", desc: "Proof of employment or business", icon: "/dam/jcr:3941c6dc-db24-4b0e-95cf-b6237d8fde45/Loan_paid.svg" },
              { title: "Easy Approval", desc: "Get results in minutes", icon: "/dam/jcr:f2c299a5-da6e-4235-966d-6967fa8890d5/Paying%20guest.svg" },
            ].map((req, i) => (
              <div key={i} className="flex flex-row lg:flex-col items-start p-6 border border-gray-100 rounded-xl bg-white hover:shadow-md transition-shadow">
                <img src={imgUrl(req.icon)} alt={req.title} className="w-10 h-10 mr-4 lg:mb-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{req.title}</h4>
                  <p className="text-sm text-gray-600">{req.desc}</p>
                </div>
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