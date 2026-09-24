'use client';

import { login } from './actions';
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('error');

  return (
    <>
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FFF8F0] border border-[#fadbc2] mb-5 shadow-sm">
          <Lock className="w-7 h-7 text-[#d96b11]" />
        </div>
        <h1 className="text-3xl font-heading font-medium text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-500 font-body text-sm">Sign in to 360 Engineering Admin</p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 font-body">{errorMessage}</p>
        </div>
      )}

      <form action={login} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-body" htmlFor="email">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#d96b11] transition-colors" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl bg-[#FFF8F0]/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11] transition-all font-body text-sm"
                placeholder="admin@360-engineering.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-body" htmlFor="password">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#d96b11] transition-colors" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="block w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-xl bg-[#FFF8F0]/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11] transition-all font-body text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#d96b11] transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 btn-primary rounded-xl py-4 mt-2"
          >
            <span>Sign In</span>
            <ArrowRight className="h-5 w-5 relative z-10" />
          </button>
        </form>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] p-4 relative overflow-hidden">
      
      {/* Decorative Brand Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fadbc2]/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#f0954a]/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="w-full max-w-md bg-white border border-[#fadbc2]/50 rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10 glass-card">
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="spinner"></div></div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
