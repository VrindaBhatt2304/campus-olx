import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import banner from "../assets/crapbanner.png"
import ProductCard from "../components/ProductCard";
import UserContext from "../context/UserContext";

export default function Home() {

  const navigate = useNavigate();

  const {prod}=useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">

      <section className="px-12 mt-12">
        <div className="max-w-7xl mx-auto rounded-3xl text-white">
          <img className="rounded-3xl shadow"
          src={banner} 
          alt="" />
        </div>
      </section>

      {/* <section className="px-12 mt-8">
        <div className="max-w-7xl mx-auto flex gap-3 flex-wrap">
          {cat?.map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(`/${item}`)}
              className="px-5 py-2 rounded-full bg-white border border-gray-300  text-gray-800 transition-all duration-300 hover:bg-gray-900 hover:scale-105 hover:text-white"
            >
              {item.title}
            </button>
          ))}
        </div>
      </section> */}

      <section className="px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Recent Listings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {prod?.slice(0,4).map((item) => (
              <ProductCard key={item._id} item={item}/>
            ))}
          </div>
        </div>
      </section>

      <div className="text-center">
        <button
        onClick={()=>
        {navigate("/products")}} 
        className="btn px-5 py-3 bg-gray-900 text-white rounded-3xl font-semibold shadow cursor-pointer hover:bg-gray-700">
          See More
        </button>
      </div>
    </div>
  );
}
