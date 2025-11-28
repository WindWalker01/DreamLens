import React, { useState } from 'react';
import Header from './partials/Header';
import Footer from './partials/Footer';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [prompt, setPrompt] = useState('');

  const categories = ["All", "Mobile", "Laptops", "Tablets", "Appliances", "Furniture", "Gaming", "Transportation"];

  const products = [
    { 
      id: 1, 
      name: "iPhone 15 Pro Max", 
      category: "Mobile", 
      cashPrice: "₱84,990", 
      monthly: "₱3,450", 
      term: "24 mos",
      image: "https://powermaccenter.com/cdn/shop/files/iPhone_15_Pro_Blue_Titanium_PDP_Image_Position-1__en-US_22107126-5b9e-4e4f-b633-899b24443e0d.jpg?v=1695948332" 
    },
    { 
      id: 2, 
      name: "Samsung Galaxy S24 Ultra", 
      category: "Mobile", 
      cashPrice: "₱84,990", 
      monthly: "₱3,200", 
      term: "24 mos",
      image: "https://images.samsung.com/is/image/samsung/p6pim/ph/2401/gallery/ph-galaxy-s24-s928-sm-s928bzqcphl-539299446?$650_519_PNG$" 
    },
    { 
      id: 3, 
      name: "MacBook Air M2 13-inch", 
      category: "Laptops", 
      cashPrice: "₱69,990", 
      monthly: "₱2,916", 
      term: "24 mos",
      image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665" 
    },
    { 
      id: 4, 
      name: "Sony Bravia 55\" 4K Google TV", 
      category: "Appliances", 
      cashPrice: "₱32,999", 
      monthly: "₱1,833", 
      term: "18 mos",
      image: "https://www.sony.com.ph/image/3d683259966b93198f24458f381014e0?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF" 
    },
    { 
      id: 5, 
      name: "LG Two Door Inverter Ref", 
      category: "Appliances", 
      cashPrice: "₱28,495", 
      monthly: "₱1,583", 
      term: "18 mos",
      image: "https://www.lg.com/ph/images/refrigerators/md07534444/gallery/D-01.jpg" 
    },
    { 
      id: 6, 
      name: "iPad Air 5 64GB", 
      category: "Tablets", 
      cashPrice: "₱39,990", 
      monthly: "₱2,221", 
      term: "18 mos",
      image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=940&hei=1112&fmt=png-alpha&.v=1645065732688" 
    },
    { 
      id: 7, 
      name: "Nintendo Switch OLED Model", 
      category: "Gaming", 
      cashPrice: "₱16,495", 
      monthly: "₱1,374", 
      term: "12 mos",
      image: "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_400/ncom/en_US/switch/site-design-update/hardware/switch/nintendo-switch-oled-model-white-set/gallery/image01" 
    },
    { 
      id: 8, 
      name: "Yamaha NMAX 155 ABS", 
      category: "Transportation", 
      cashPrice: "₱151,900", 
      monthly: "₱4,800", 
      term: "36 mos",
      image: "https://www.yamaha-motor.com.ph/uploads/product_assets/1643953648_NMAX_ICON_GRAY.png" 
    },
    { 
      id: 9, 
      name: "Acer Nitro 5 Gaming Laptop", 
      category: "Laptops", 
      cashPrice: "₱54,999", 
      monthly: "₱3,055", 
      term: "18 mos",
      image: "https://images.acer.com/is/image/acer/Nitro5_AN515-57_ag_Bk_RGB_01a?$Product-Cards-XL$" 
    },
    { 
      id: 10, 
      name: "Mandaue Foam Sofa Bed", 
      category: "Furniture", 
      cashPrice: "₱12,500", 
      monthly: "₱1,041", 
      term: "12 mos",
      image: "https://mandauefoam.ph/cdn/shop/files/Kolt_Sofa_Bed_Grey_1_2048x2048.jpg?v=1706686737" 
    },
    { 
      id: 11, 
      name: "Panasonic Split Type Aircon", 
      category: "Appliances", 
      cashPrice: "₱36,999", 
      monthly: "₱2,055", 
      term: "18 mos",
      image: "https://www.panasonic.com/content/dam/pim/ph/en/CS/CS-XU/CS-XU9XKQ/CS-XU9XKQ-Variation_Image_for_See_All_1Global-1_ph_en.png" 
    },
    { 
      id: 12, 
      name: "NWOW ERV E-Bike", 
      category: "Transportation", 
      cashPrice: "₱39,000", 
      monthly: "₱2,166", 
      term: "18 mos",
      image: "https://nwow.com.ph/wp-content/uploads/2021/01/ERV-white-300x300.jpg" 
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(prompt.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="font-sans text-gray-900 bg-gray-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="bg-gradient-to-r from-[#E11931] to-[#ff4b6e] text-white py-16 px-4 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-300 opacity-10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
           
           <div className="max-w-4xl mx-auto relative z-10 text-center">
             <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Find Your Dream Product</h1>
             <p className="text-lg md:text-xl text-red-50 mb-10 max-w-2xl mx-auto">Tell our AI what you need, and we'll find the best installment plans for you.</p>
             
             <div className="relative max-w-2xl mx-auto group">
               <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
               <div className="relative flex items-center bg-white rounded-xl shadow-2xl">
                 <div className="pl-6 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                 </div>
                 <input 
                   type="text" 
                   value={prompt}
                   onChange={(e) => setPrompt(e.target.value)}
                   placeholder="Ask AI: 'Laptop for gaming under 3k/month'..."
                   className="w-full px-4 py-5 rounded-xl text-gray-900 placeholder-gray-400 bg-transparent border-none focus:ring-0 text-lg"
                 />
                 <button className="absolute right-2 bg-gray-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#E11931] transition-all duration-300 shadow-md">
                   Search
                 </button>
               </div>
             </div>
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex overflow-x-auto pb-6 gap-2 no-scrollbar mb-4">
                {categories.map((cat) => (
                    <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                            selectedCategory === cat 
                            ? 'bg-gray-900 text-white shadow-lg transform scale-105' 
                            : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-[#E11931] border border-gray-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Deals`}
                </h2>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">{filteredProducts.length} items</span>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group border border-gray-100 relative">
                            <div className="absolute top-4 left-4 z-10">
                                <span className="bg-gray-900/5 backdrop-blur-md border border-gray-200 text-gray-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {product.category}
                                </span>
                            </div>
                            
                            <div className="relative aspect-[1/1] mb-6 rounded-2xl bg-gray-50 overflow-hidden flex items-center justify-center p-6">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            
                            <div className="flex flex-col flex-grow px-2 pb-2">
                                <h3 className="font-bold text-gray-900 text-lg leading-snug mb-4 line-clamp-2">
                                    {product.name}
                                </h3>
                                
                                <div className="mt-auto">
                                    <div className="flex flex-col gap-1 mb-4">
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>Cash Price</span>
                                            <span className="line-through opacity-50">{product.cashPrice}</span>
                                        </div>
                                        <div className="flex items-baseline gap-1 text-[#E11931]">
                                            <span className="text-2xl font-black">{product.monthly}</span>
                                            <span className="text-sm font-semibold text-gray-500">/mo</span>
                                        </div>
                                        <p className="text-[11px] text-gray-400 font-medium">
                                            for {product.term} w/ Home Credit
                                        </p>
                                    </div>

                                    <button className="w-full bg-[#E11931] text-white py-3 rounded-xl font-bold hover:bg-red-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-red-500/30">
                                        <span>Compute Loan</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
                    <div className="p-6 bg-red-50 rounded-full mb-6 animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#E11931]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500">We couldn't find any "{selectedCategory}" matching your search.</p>
                    <button 
                        onClick={() => {setPrompt(''); setSelectedCategory('All');}}
                        className="mt-6 text-[#E11931] font-semibold hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;