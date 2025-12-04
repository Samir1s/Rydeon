"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      // Redirect to login after successful signup
      alert("Account created successfully! Please log in.");
      window.location.href = "/login";
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Rydeon</h1>
          </Link>
        </div>

        {/* Signup Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 animate-slide-up">
          <h2 className="text-2xl font-bold mb-2 text-white">Create your account</h2>
          <p className="text-gray-400 mb-8">Sign up to get started</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg backdrop-blur-sm">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:bg-white/10 focus:border-purple-400/50 transition-all duration-300 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:bg-white/10 focus:border-purple-400/50 transition-all duration-300 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:bg-white/10 focus:border-purple-400/50 transition-all duration-300 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                minLength={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:bg-white/10 focus:border-purple-400/50 transition-all duration-300 text-white placeholder-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
            </div>

            <div className="text-sm text-gray-400">
              <label className="flex items-start">
                <input type="checkbox" required className="mr-2 mt-1 accent-purple-500" />
                <span>
                  I agree to the{" "}
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-400 font-medium hover:text-purple-300 transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Options */}
        <div className="mt-8 text-center animate-fade-in" style={{animationDelay: '0.2s'}}>
          <p className="text-sm text-gray-400 mb-4">Or sign up with</p>
          <div className="flex gap-4 justify-center">
            <button className="flex-1 max-w-[200px] py-3 border border-white/20 rounded-xl hover:bg-white/5 transition-all duration-300 bg-white/5 backdrop-blur-sm">
              <span className="font-medium text-white">Google</span>
            </button>
            <button className="flex-1 max-w-[200px] py-3 border border-white/20 rounded-xl hover:bg-white/5 transition-all duration-300 bg-white/5 backdrop-blur-sm">
              <span className="font-medium text-white">Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
