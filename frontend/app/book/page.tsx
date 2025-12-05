"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import map to avoid SSR issues
const SimpleMap = dynamic(() => import("@/components/SimpleMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-2">🗺️</div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

export default function BookRide() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupCoords, setPickupCoords] = useState<{lat: number, lng: number} | null>(null);
  const [dropCoords, setDropCoords] = useState<{lat: number, lng: number} | null>(null);
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const [showRides, setShowRides] = useState(false);
  const [showMap, setShowMap] = useState(true);

  const rideOptions = [
    {
      id: "rydeon-x",
      name: "Rydeon X",
      description: "Affordable, compact rides",
      price: "₹150",
      time: "2 min",
      capacity: "4",
      icon: "🚗"
    },
    {
      id: "rydeon-comfort",
      name: "Rydeon Comfort",
      description: "Newer cars with extra legroom",
      price: "₹200",
      time: "3 min",
      capacity: "4",
      icon: "🚙"
    },
    {
      id: "rydeon-xl",
      name: "Rydeon XL",
      description: "Affordable rides for groups up to 6",
      price: "₹280",
      time: "5 min",
      capacity: "6",
      icon: "🚐"
    },
    {
      id: "rydeon-premium",
      name: "Rydeon Premium",
      description: "High-end cars with top-rated drivers",
      price: "₹350",
      time: "4 min",
      capacity: "4",
      icon: "✨"
    }
  ];

  const handleSearchRides = () => {
    if (pickup && dropoff) {
      setShowRides(true);
    }
  };

  useEffect(() => {
    if (pickupCoords && dropCoords) {
      setPickup(`${pickupCoords.lat.toFixed(4)}, ${pickupCoords.lng.toFixed(4)}`);
      setDropoff(`${dropCoords.lat.toFixed(4)}, ${dropCoords.lng.toFixed(4)}`);
      setShowRides(true);
    }
  }, [pickupCoords, dropCoords]);

  const handleBookRide = async () => {
    if (!selectedRide) return;

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
    
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://rydeon.onrender.com";
    
    try {
      const res = await axios.post(
        `${API_URL}/rides/book`,
        {
          passenger_id: 1, // Replace with actual user ID from token
          pickup_location: pickup,
          drop_location: dropoff,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.location.href = `/ride/${res.data.id}`;
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book ride. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Left Side - Booking Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 h-fit lg:sticky lg:top-24 border border-white/20 animate-slide-in-left order-1">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Request a ride now</h1>
            
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              {/* Pickup Input */}
              <div className="relative group">
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-400 rounded-full group-focus-within:scale-125 transition-transform"></div>
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:bg-white/10 focus:border-purple-400/50 transition-all duration-300 text-white placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              {/* Dropoff Input */}
              <div className="relative group">
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-400 rounded-full group-focus-within:scale-125 transition-transform"></div>
                <input
                  type="text"
                  placeholder="Enter destination"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:bg-white/10 focus:border-blue-400/50 transition-all duration-300 text-white placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearchRides}
                disabled={!pickup || !dropoff}
                className="w-full py-3 sm:py-4 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 disabled:bg-white/20 disabled:text-gray-500 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
              >
                See prices
              </button>
            </div>

            {/* Additional Options */}
            <div className="border-t border-white/10 pt-4 sm:pt-6 space-y-2 sm:space-y-3">
              <button className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-white/5 rounded-xl transition-all duration-300 group">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-xl sm:text-2xl">🕐</span>
                  <span className="font-medium text-white text-sm sm:text-base">Schedule for later</span>
                </div>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform text-sm sm:text-base">→</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-white/5 rounded-xl transition-all duration-300 group">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-xl sm:text-2xl">💼</span>
                  <span className="font-medium text-white text-sm sm:text-base">Add promo code</span>
                </div>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform text-sm sm:text-base">→</span>
              </button>
            </div>
          </div>

          {/* Right Side - Map or Ride Options */}
          <div className="animate-slide-in-right order-2 min-h-[400px] lg:min-h-[600px]">
            {showRides ? (
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Choose a ride</h2>
                
                {rideOptions.map((ride, index) => (
                  <div
                    key={ride.id}
                    onClick={() => setSelectedRide(ride.id)}
                    className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 border animate-slide-up ${
                      selectedRide === ride.id
                        ? "border-purple-500 shadow-lg shadow-purple-500/20 bg-white/10"
                        : "border-white/10 hover:border-white/20 hover:bg-white/10"
                    }`}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                        <div className="text-3xl sm:text-4xl flex-shrink-0">{ride.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 flex-wrap">
                            <h3 className="font-bold text-base sm:text-lg text-white">{ride.name}</h3>
                            <span className="text-xs sm:text-sm text-gray-400">{ride.time}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-400 truncate">{ride.description}</p>
                          <p className="text-xs text-gray-500 mt-1">👤 {ride.capacity} seats</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg sm:text-xl font-bold text-white">{ride.price}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Confirm Button */}
                {selectedRide && (
                  <button
                    onClick={handleBookRide}
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] mt-4 sm:mt-6 animate-scale-in text-sm sm:text-base"
                  >
                    Confirm {rideOptions.find(r => r.id === selectedRide)?.name}
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Select locations on map</h2>
                </div>
                <SimpleMap setPickup={setPickupCoords} setDrop={setDropCoords} />
                <div className="mt-3 sm:mt-4 space-y-2 bg-white/5 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-white/10">
                  {pickupCoords && (
                    <div className="text-sm text-green-400 flex items-center space-x-2">
                      <span>✓</span>
                      <span>Pickup: {pickupCoords.lat.toFixed(4)}, {pickupCoords.lng.toFixed(4)}</span>
                    </div>
                  )}
                  {dropCoords && (
                    <div className="text-sm text-green-400 flex items-center space-x-2">
                      <span>✓</span>
                      <span>Drop-off: {dropCoords.lat.toFixed(4)}, {dropCoords.lng.toFixed(4)}</span>
                    </div>
                  )}
                  {!pickupCoords && !dropCoords && (
                    <p className="text-sm text-gray-400 text-center">
                      Click on the map to select pickup location, then click again for drop-off
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-in">
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">⚡</div>
            <h3 className="font-bold mb-1 sm:mb-2 text-white text-sm sm:text-base">Quick pickup</h3>
            <p className="text-xs sm:text-sm text-gray-400">Drivers arrive in minutes</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.1s'}}>
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">💳</div>
            <h3 className="font-bold mb-1 sm:mb-2 text-white text-sm sm:text-base">Easy payment</h3>
            <p className="text-xs sm:text-sm text-gray-400">Cash or cashless, your choice</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🛡️</div>
            <h3 className="font-bold mb-1 sm:mb-2 text-white text-sm sm:text-base">Safe rides</h3>
            <p className="text-xs sm:text-sm text-gray-400">Verified drivers and 24/7 support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
