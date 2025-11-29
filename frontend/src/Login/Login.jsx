import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AwesomeButton = ({ children, onClick, type = "primary", className = "" }) => {
  const baseStyle = "w-full group relative inline-flex items-center justify-center px-6 py-3.5 font-bold text-sm tracking-wide transition-all duration-150 rounded-2xl focus:outline-none active:scale-[0.98]";
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn = () => {
    console.log("Google Sign In Clicked");
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-900">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-[45%] z-10 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <Link to="/">
                <img
                className="h-10 w-auto mb-8"
                src="https://www.homecredit.ph/dam/jcr:f8f42554-077c-4929-9d73-51d70c9ef9fd/hc-logo.svg"
                alt="Home Credit"
                />
            </Link>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your details to sign in.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address or Mobile Number
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#E11931] focus:border-[#E11931] sm:text-sm transition-colors"
                  placeholder="juan@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#E11931] focus:border-[#E11931] sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#E11931] focus:ring-[#E11931] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#E11931] hover:text-red-700">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <AwesomeButton type="primary" onClick={() => console.log("Sign In Pressed")}>
                Sign in
              </AwesomeButton>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div>
              <AwesomeButton type="secondary" onClick={handleGoogleSignIn}>
                <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Sign in with Google
                </div>
              </AwesomeButton>
            </div>
            
            <p className="mt-8 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-bold text-[#E11931] hover:text-red-700">
                    Register now
                </Link>
            </p>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E11931]/90 to-black/60 mix-blend-multiply z-10"></div>
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://myaccount.homecredit.ph/images/login/login-banner-bg.webp"
          alt="Home Credit Lifestyle"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-16 text-white">
            <h2 className="text-4xl font-bold mb-4">Financial freedom at your fingertips</h2>
            <p className="text-xl text-gray-100 max-w-lg">Manage your loans, pay bills, and shop for your favorite items with the My Home Credit App.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;