'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, Inbox, LogOut, Menu, X, Calculator, Users } from 'lucide-react';
import { useState } from 'react';
import { logout } from './actions';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
  { name: 'Clients', href: '/admin/clients', icon: Users },
  { name: 'Inbox / Leads', href: '/admin/inbox', icon: Inbox },
  { name: 'Estimator Settings', href: '/admin/estimator', icon: Calculator },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col md:flex-row font-body text-gray-900">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between p-4 bg-white border-b border-[#fadbc2] shadow-sm">
        <Image src="/logo-new.png" alt="360 Engineering Logo" width={100} height={40} className="object-contain invert opacity-80" />
        <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-600 hover:text-[#d96b11]">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen z-50 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } flex flex-col w-[260px] md:w-56 lg:w-72 bg-white border-r border-[#fadbc2] transition-transform duration-300 ease-in-out shadow-[4px_0_24px_rgba(0,0,0,0.02)] shrink-0`}
      >
        <div className="flex md:hidden p-4 items-center justify-between border-b border-[#fadbc2]">
          <Image src="/logo-new.png" alt="360 Engineering Logo" width={100} height={40} className="object-contain invert opacity-80" />
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-[#d96b11]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="hidden md:flex p-4 lg:p-6 items-center justify-center border-b border-[#fadbc2]">
          <Image src="/logo-new.png" alt="360 Engineering Logo" width={140} height={50} className="w-24 lg:w-32 object-contain invert opacity-80" />
        </div>

        <nav className="flex-1 px-3 lg:px-4 py-6 lg:py-8 space-y-2 lg:space-y-3 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.href === '/admin' 
              ? pathname === '/admin' 
              : (pathname === item.href || pathname.startsWith(item.href + '/'));
              
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 lg:gap-4 px-4 lg:px-5 py-3 lg:py-3.5 rounded-xl lg:rounded-2xl transition-all duration-200 text-sm lg:text-base font-medium ${
                  isActive
                    ? 'bg-[#d96b11] text-white shadow-md shadow-[#d96b11]/20'
                    : 'text-gray-500 hover:bg-[#fadbc2]/30 hover:text-[#b5540b]'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'} shrink-0`} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 lg:p-4 border-t border-[#fadbc2]">
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 lg:gap-4 w-full px-4 lg:px-5 py-3 lg:py-3.5 rounded-xl lg:rounded-2xl text-sm lg:text-base text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-medium"
          >
            <LogOut className="w-5 h-5 text-gray-400 shrink-0" />
            <span className="truncate">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="hidden md:flex items-center justify-between px-10 py-6 bg-white/80 backdrop-blur-md border-b border-[#fadbc2]/50 sticky top-0 z-10">
          <h2 className="text-2xl font-heading font-medium text-gray-800 capitalize">
            {pathname === '/admin' ? 'Dashboard Overview' : pathname.split('/').pop()}
          </h2>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-[#FFF8F0] flex items-center justify-center text-sm font-semibold text-[#b5540b] border border-[#fadbc2] shadow-sm">
              AD
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
