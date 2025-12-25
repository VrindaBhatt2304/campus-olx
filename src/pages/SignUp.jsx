import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";

export default function SignUp() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [college, setCollege] = useState(null);
  const [phone, setPhone] = useState(null);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email.endsWith("@nitrr.ac.in")) {
      toast.error("Only @nitrr.ac.in email IDs are allowed");
      return;
    }
    const data = { name, phone, college, email, password };
    axios
      .post("${import.meta.env.VITE_BACKEND_URL}/user/register", data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setUser(response.data.user);
          localStorage.setItem("token", response.data.token);
          toast.success("Successfully Registered!!");
          navigate("/");
        }
      })
      .catch((e)=>{
      toast.error(e?.response.data.msg);
    })
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-lg p-12">
        <h2 className="text-4xl font-bold text-gray-900 text-center tracking-tight">
          Create Account
        </h2>

        <p className="text-gray-600 text-center mt-2 mb-10">
          Sign up using your college email to get started
        </p>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-gray-800 mb-2 font-medium">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-800 mb-2 font-medium">
              College Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="yourid@nitrr.ac.in"
            />
          </div>
          <div>
            <label className="block text-gray-800 mb-2 font-medium">
              College
            </label>
            <input
              type="text"
              required
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="college name"
            />
          </div>
          <div>
            <label className="block text-gray-800 mb-2 font-medium">
              Phone
            </label>
            <input
              type="number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Set phone Number"
            />
          </div>

          <div>
            <label className="block text-gray-800 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gray-900 text-white font-medium shadow-md transition-all duration-300 hover:bg-gray-800 hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8">
          Already logged in?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-gray-900 font-semibold cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
