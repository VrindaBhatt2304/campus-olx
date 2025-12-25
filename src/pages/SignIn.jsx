import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.endsWith("@nitrr.ac.in")) {
      setError("Only @nitrr.ac.in email IDs are allowed");
      return;
    }
    axios
      .post("http://localhost:5000/user/login", { email, password })
      .then((response) => {
        if(response.status === 200) {
          setUser(response.data.user);
          localStorage.setItem("token", response.data.token);
          toast.success("Successfully Logged in!")
          navigate("/");
        }
      }
    )
    .catch(e=>{
      console.log(e);
      toast.error(e?.response?.data?.msg);
    })
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white border border-gray-300 rounded-xl p-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Sign In
        </h2>

        <p className="text-gray-600 text-center mt-2 mb-8">
          Sign in using your college email to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">College Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-sm text-white bg-gray-700 px-4 py-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
