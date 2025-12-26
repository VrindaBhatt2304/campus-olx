import React, { useContext, useEffect, useState } from "react";
import SellerInformationModal from "../components/SellerInformationModal";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";

function Product() {
  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/product/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, []);

  async function handleWishlist() {
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/addwishlist`,{prod_id:id},
      {headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},}
    ).then((response)=>{
      setUser(response.data.user);
      localStorage.setItem("token",response.data.token);
    }).catch((e)=>{
      console.error("Error : ",e);
      toast.error(e.response.data.msg);
    });
  }
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-16 lg:px-32">
      <div className="flex flex-col align-start md:flex-row gap-12 w-full">
        <div className="flex-1 flex flex-col items-start justify-center space-y-4 ">
          <img
            src={product?.images[0]}
            alt={product?.title}
            className="object-fit h-[500px] w-full bg-gray-200 rounded-2xl shadow-md transition-all duration-300 ease-out hover:scale-105 hover:bg-black hover:shadow-xl"
            style={{ aspectRatio: 2 / 3 }}
          />
          <div className="grid grid-cols-3 gap-3 w-[500px]">
            {product?.images.slice(1, 4).map((img, key) => (
              <img
                key={key}
                src={img}
                alt=""
                className="object-cover w-full h-[250px] bg-gray-200 rounded-2xl shadow-md transition-all duration-300 ease-out hover:scale-105 hover:bg-black hover:shadow-xl"
              />
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6 justify-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {product?.title}
          </h1>
          <p className="text-2xl text-gray-700 font-semibold">
            Price: ₹{product?.price}
          </p>
          <div className="flex flex-wrap gap-4 text-base text-gray-600">
            <span className="font-semibold text-gray-800">
              Category: {product?.category.title}
            </span>
            <span className="font-semibold text-gray-800">
              Seller: {product?.seller.name}
            </span>
          </div>
          <div>
            <p className="text-lg text-gray-700 mt-4 mb-8">
            Description: 
            </p>
            <p>
              {product?.description}
            </p>
          </div>
          
          <div className="flex gap-4">
            <button
            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all w-fit text-lg"
            onClick={() => setModalOpen(true)}
          >
            Contact Seller
          </button>
          <button
            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all w-fit text-lg"
            onClick={handleWishlist}
          >
            {user?.wishlist.includes(id)?"Added to Wishlist":"+ Wishlist"}
          </button>
          </div>
        </div>
      </div>
      <SellerInformationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        seller={product?.seller}
      />
    </div>
  );
}

export default Product;
