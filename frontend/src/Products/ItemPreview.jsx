import React, { useState, useEffect } from 'react';

const ItemPreview = ({ product, onClose }) => {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [term, setTerm] = useState(12);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const parsePrice = (priceStr) => {
    return parseFloat(priceStr.replace(/[^0-9.-]+/g, ""));
  };

  const cashPrice = parsePrice(product.cashPrice);
  const downPaymentAmount = (cashPrice * downPaymentPercent) / 100;
  const loanAmount = cashPrice - downPaymentAmount;
  const interestRate = 0.035; 
  const monthlyPayment = (loanAmount + (loanAmount * interestRate * term)) / term;

  const formatCurrency = (val) => {
    return "₱" + val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${animate ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className={`relative w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh] lg:h-auto transition-all duration-500 transform ${animate ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full lg:w-1/2 bg-gray-50 relative p-8 lg:p-12 flex items-center justify-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-red-100 rounded-full blur-[100px] opacity-60"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-100 rounded-full blur-[100px] opacity-60"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-md">
            <div className="absolute top-0 left-0">
               <span className="bg-white/90 backdrop-blur border border-gray-200 text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  {product.category}
               </span>
            </div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-contain mix-blend-multiply drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col bg-white overflow-y-auto custom-scrollbar">
          <div className="p-8 lg:p-10 flex-grow">
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h2>
              <div className="flex items-center gap-4 text-gray-500">
                <span className="text-lg">Cash Price: <span className="font-semibold text-gray-900">{product.cashPrice}</span></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">In Stock</span>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Down Payment</label>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#E11931]">{formatCurrency(downPaymentAmount)}</span>
                    <span className="text-sm text-gray-500 font-medium ml-2">({downPaymentPercent}%)</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="60" 
                  step="10" 
                  value={downPaymentPercent} 
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E11931]"
                />
                <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
                  <span>0%</span>
                  <span>30%</span>
                  <span>60%</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Installment Term</label>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#E11931]">{term}</span>
                    <span className="text-sm text-gray-500 font-medium ml-2">Months</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="6" 
                  max="36" 
                  step="3" 
                  value={term} 
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E11931]"
                />
                <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
                  <span>6 Mo</span>
                  <span>18 Mo</span>
                  <span>36 Mo</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-white p-8 lg:p-10 mt-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Estimated Monthly</p>
                <div className="flex items-baseline gap-1">
                   <span className="text-4xl font-bold tracking-tight">{formatCurrency(monthlyPayment)}</span>
                   <span className="text-gray-400">/mo</span>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-gray-400 text-sm font-medium mb-1">Loan Amount</p>
                <p className="text-xl font-semibold">{formatCurrency(loanAmount)}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
               <button className="flex-1 bg-[#E11931] hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-red-900/50 hover:-translate-y-1">
                 Apply Now
               </button>
               <button className="hidden sm:flex items-center justify-center px-6 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors border border-gray-700">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                 </svg>
               </button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">
               *Estimates only. Final approval subject to Home Credit evaluation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPreview;