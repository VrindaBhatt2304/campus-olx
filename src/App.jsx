import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUp from "./pages/SignUp";
import Home from "./pages/Homepage";
import SignIn from "./pages/SignIn";
import AboutUs from "./pages/AboutUs";
import UserContext from "./context/UserContext";
import Products from "./pages/Products";
import Product from "./pages/Product";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import ProtectedLayout from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import AddProduct from "./pages/AddProduct";
import MyProfile from "./pages/MyProfile";
import Footer from "./components/Footer";

function App() {
  const [cat, setCat] = useState(null);
  const [prod, setProd] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log(user);
  }, [user]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/category/get`).then((response) => {
      setCat(() => response.data);
    });

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/`).then((response) => {
      setProd(() => response.data);
    });

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/getuser`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setUser(() => response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <UserContext.Provider
        value={{ cat, setCat, prod, setProd, user, setUser, isLoading }}
      >
        <NavBar />
        <div className="flex flex-col">
          <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<AuthRoute />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
            </Route>
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route element={<ProtectedLayout />}>
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
            </Route>
          </Routes>
          </div>
          <Footer />
        </div>
        <ToastContainer />
      </UserContext.Provider>
      
    </>
  );
}

export default App;
