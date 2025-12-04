"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center group">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-300">
              Rydeon
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavItem name="Ride" href="/book" />
            <NavItem name="Drive" href="/driver" />
            <NavItem name="About" href="/about" />
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 text-sm font-medium text-black bg-white hover:bg-gray-100 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white focus:outline-none hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/80 backdrop-blur-2xl border-t border-white/10 animate-slide-up">
          <div className="px-4 py-4 space-y-1">
            <MobileItem name="Ride" href="/book" />
            <MobileItem name="Drive" href="/driver" />
            <MobileItem name="About" href="/about" />
          </div>
          <div className="px-4 py-4 border-t border-white/10 space-y-2">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="block w-full px-4 py-3 text-center text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-3 text-center text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block w-full px-4 py-3 text-center text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="block w-full px-4 py-3 text-center text-sm font-medium text-black bg-white hover:bg-gray-100 rounded-lg transition-all duration-300"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavItem({ name, href }: { name: string; href: string }) {
  return (
    <Link
      href={href}
      className="text-gray-400 hover:text-white transition-colors duration-300 font-medium text-sm"
    >
      {name}
    </Link>
  );
}

function MobileItem({ name, href }: { name: string; href: string }) {
  return (
    <Link
      href={href}
      className="block px-4 py-3 text-base text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
    >
      {name}
    </Link>
  );
}
