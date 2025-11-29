import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AwesomeButton = ({ children, onClick, type = "primary", className = "" }) => {
  const baseStyle = "w-full group relative inline-flex items-center justify-center px-4 py-3 font-bold text-base tracking-wide transition-all duration-150 rounded-2xl focus:outline-none active:scale-[0.98]";
  
  const primaryStyle = "bg-[#E11931] text-white shadow-[0_6px_0_#9f1223] hover:shadow-[0_4px_0_#9f1223] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px]";
  const secondaryStyle = "bg-white text-gray-700 border-2 border-gray-100 shadow-[0_6px_0_#e5e7eb] hover:shadow-[0_4px_0_#e5e7eb] hover:translate-y-[2px] hover:bg-gray-50 active:shadow-none active:translate-y-[6px]";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${type === 'primary' ? primaryStyle : secondaryStyle} ${className}`}
    >
      {children}
    </button>
  );
};

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-900">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
         <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" 
            alt="Registration" 
            className="w-full h-full object-cover opacity-80"
         />
         <div className="absolute bottom-0 left-0 p-16 z-20">
             <img
                className="h-12 w-auto mb-6 brightness-0 invert"
                src="https://www.homecredit.ph/dam/jcr:f8f42554-077c-4929-9d73-51d70c9ef9fd/hc-logo.svg"
                alt="Home Credit"
             />
             <h1 className="text-5xl font-bold text-white mb-4 leading-tight">Join millions of <br/>Filipinos today.</h1>
             <p className="text-xl text-gray-300">Fast approval. Flexible terms. Easy application.</p>
         </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white overflow-y-auto">
        <div className="mx-auto w-full max-w-md lg:w-[500px]">
          <div className="text-left mb-10">
            <Link to="/" className="lg:hidden">
                <img
                className="h-8 w-auto mb-6"
                src="https://www.homecredit.ph/dam/jcr:f8f42554-077c-4929-9d73-51d70c9ef9fd/hc-logo.svg"
                alt="Home Credit"
                />
            </Link>
            <h2 className="text-3xl font-extrabold text-gray-900">Create an account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-[#E11931] hover:text-red-700">
                Sign in here
              </Link>
            </p>
          </div>

          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#E11931] focus:border-[#E11931] sm:text-sm"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        required
                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#E11931] focus:border-[#E11931] sm:text-sm"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm font-medium">+63</span>
                </div>
                <input
                  type="text"
                  name="mobile"
                  required
                  className="appearance-none block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#E11931] focus:border-[#E11931] sm:text-sm"
                  placeholder="917 123 4567"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#E11931] focus:border-[#E11931] sm:text-sm"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#E11931] focus:border-[#E11931] sm:text-sm"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#E11931] focus:border-[#E11931] sm:text-sm"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-[#E11931] focus:ring-[#E11931] border-gray-300 rounded"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                  I agree to the <a href="#" className="text-[#E11931] hover:underline">Terms of Service</a> and <a href="#" className="text-[#E11931] hover:underline">Privacy Policy</a>
                </label>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <AwesomeButton type="primary" className="max-w-sm w-full mx-auto">
                Create Account
              </AwesomeButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;