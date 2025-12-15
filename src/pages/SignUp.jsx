import React, { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email.endsWith("@nitrr.ac.in")) {
      setError("Only @nitrr.ac.in email IDs are allowed");
      return;
    }

    setError("");
    alert("Signup successful!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Enter your name"
            />
          </div>

          
          <div>
            <label className="block text-gray-700 mb-1">College Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="yourid@nitrr.ac.in"
            />
          </div>

          
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Enter password"
            />
          </div>

          
          {error && (
            <p className="text-sm text-white bg-gray-700 px-3 py-2 rounded">
              {error}
            </p>
          )}

          
          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
          >
            Sign Up
          </button>
        </form>

      </div>
    </div>
  );
}
