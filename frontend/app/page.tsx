"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [activeTab, setActiveTab] = useState("ride");

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Booking Widget */}
            <div className="animate-slide-in-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
                Go anywhere with{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Rydeon
                </span>
              </h1>
              
              {/* Tab Navigation */}
              <div className="flex space-x-1 mb-6 bg-white/5 backdrop-blur-sm p-1 rounded-xl w-fit border border-white/10">
                <button
                  onClick={() => setActiveTab("ride")}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === "ride"
                      ? "bg-white text-black shadow-lg shadow-white/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Ride
                </button>
                <button
                  onClick={() => setActiveTab("package")}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === "package"
                      ? "bg-white text-black shadow-lg shadow-white/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Package
                </button>
              </div>
              
              {/* Booking Form */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 max-w-md border border-white/20 hover:border-white/30 transition-all duration-300 animate-scale-in">
                <div className="space-y-3">
                  {/* Pickup Input */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-2 h-2 bg-purple-400 rounded-full group-focus-within:scale-125 transition-transform"></div>
                    </div>
                    <input
                      type="text"
                      placeholder="Pickup location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:bg-white/10 focus:border-purple-400/50 transition-all duration-300 text-white placeholder-gray-400 text-base"
                    />
                  </div>
                  
                  {/* Destination Input */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-2 h-2 bg-blue-400 rounded-full group-focus-within:scale-125 transition-transform"></div>
                    </div>
                    <input
                      type="text"
                      placeholder="Destination"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:bg-white/10 focus:border-blue-400/50 transition-all duration-300 text-white placeholder-gray-400 text-base"
                    />
                  </div>

                  {/* Action Buttons */}
                  <Link
                    href="/book"
                    className="block w-full py-4 text-center text-black bg-white hover:bg-gray-100 rounded-xl font-medium transition-all duration-300 text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    See prices
                  </Link>

                  {/* Schedule Link */}
                  <Link
                    href="/book"
                    className="block text-center text-sm text-gray-400 hover:text-white transition-colors duration-300 py-2"
                  >
                    Schedule for later →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden lg:flex items-center justify-center animate-slide-in-right">
              <div className="relative w-full max-w-[280px] xl:max-w-[320px]">
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-[2.5rem] blur-3xl"></div>
                
                {/* Phone mockup illustration */}
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-[2rem] p-2.5 shadow-2xl border border-white/10">
                  <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[1.75rem] overflow-hidden h-[560px] xl:h-[640px]">
                    {/* App Screenshot Mockup */}
                    <div className="h-full p-4 flex flex-col">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center space-y-3 animate-pulse">
                          <div className="w-14 h-14 xl:w-16 xl:h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-purple-500/50">
                            <svg className="w-7 h-7 xl:w-8 xl:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="space-y-1.5">
                            <div className="h-2 bg-white/20 rounded w-24 xl:w-28 mx-auto"></div>
                            <div className="h-2 bg-white/10 rounded w-16 xl:w-20 mx-auto"></div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-12 xl:h-14 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"></div>
                        <div className="h-12 xl:h-14 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"></div>
                        <div className="h-10 xl:h-11 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white animate-fade-in">
            Suggestions
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Ride */}
            <Link href="/book" className="group animate-slide-up">
              <div className="bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-2xl p-8 transition-all duration-300 border border-white/10 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🚗</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Ride</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Go anywhere with Rydeon. Request a ride, hop in, and go.
                </p>
                <div className="text-white font-medium group-hover:text-purple-400 inline-flex items-center transition-colors duration-300">
                  Details
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
            
            {/* Drive */}
            <Link href="/driver" className="group animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-2xl p-8 transition-all duration-300 border border-white/10 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💼</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Drive</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Make money driving with Rydeon. Set your own schedule.
                </p>
                <div className="text-white font-medium group-hover:text-blue-400 inline-flex items-center transition-colors duration-300">
                  Details
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
            
            {/* Package */}
            <Link href="/package" className="group animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-2xl p-8 transition-all duration-300 border border-white/10 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📦</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Package</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Rydeon Connect makes same-day delivery easier than ever.
                </p>
                <div className="text-white font-medium group-hover:text-green-400 inline-flex items-center transition-colors duration-300">
                  Details
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Your safety drives us
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Whether you're in the back seat or behind the wheel, your safety is essential. We are committed to doing our part, and technology is at the heart of our approach.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-white font-medium hover:text-purple-400 transition-colors duration-300 group"
              >
                Learn more about our safety features
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 flex items-center justify-center animate-scale-in hover:border-purple-500/50 transition-all duration-300">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-purple-500/50 animate-pulse">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Safety First</h3>
                <p className="text-gray-400">24/7 support and verified drivers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        {/* Smooth gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-blue-900/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.15),transparent_60%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              It's easier in the apps
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Download the Rydeon app for the best experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/signup"
                className="px-8 py-4 text-base font-medium text-black bg-white hover:bg-gray-100 rounded-xl transition-all duration-300 min-w-[200px] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Sign up to ride
              </Link>
              <Link
                href="/driver"
                className="px-8 py-4 text-base font-medium text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 min-w-[200px] hover:scale-105 active:scale-95"
              >
                Sign up to drive
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
