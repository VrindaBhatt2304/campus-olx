import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import logo from "../assets/crap.png";

function NavBar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className=" bg-white shadow-md ">
      <div className="w-full px-5 py-3 flex items-center justify-between">
          <img
          src={logo}
          alt="CampusOLX Logo"
          onClick={() => navigate("/")}
          className="object-contain h-16 w-32 cursor-pointer hover:scale-145 transition-transform duration-200"
        />

        <div className="flex items-center flex-1 mx-8">
          {location.pathname === "/products" && (
            <div className="flex w-full max-w-xl rounded-lg overflow-hidden border border-gray-300">
              <input
                type="text"
                placeholder="Search products on CampusOLX"
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              <button className="px-6 py-2 rounded-br-lg rounded-tr-lg  bg-gray-900 text-white font-medium shadow-md transition-all duration-300 ease-out  hover:bg-gray-800 hover:scale-105 hover:shadow-lg active:scale-95">
                Search
              </button>
            </div>
          )}
        </div>

        {user !== null ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-900">
              Hi, <span 
              onClick={()=> navigate("/myprofile")}
              className="font-semibold hover:text-gray-900 cursor-pointer">{user?.name}</span>
            </span>
            <button
              onClick={() => navigate("/addproduct")}
              className="px-6 py-2 cursor-pointer rounded-lg bg-green-100 text-green-900 font-medium shadow-md transition-all duration-300 hover:bg-green-200 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              + Add
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 cursor-pointer rounded-lg  bg-gray-900 text-white font-medium shadow-md transition-all duration-300 ease-out  hover:bg-gray-800 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2 cursor-pointer rounded-lg  bg-gray-900 text-white font-medium shadow-md transition-all duration-300 ease-out  hover:bg-gray-800 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
