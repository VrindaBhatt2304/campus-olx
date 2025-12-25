import React from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function ProductCard({item}) {
  const navigate = useNavigate();

  const handleClick = ()=>{
    console.log(item._id);
    navigate(`/product/${item._id}`); 
  };
  return (
    <div 
    onClick={handleClick}
    className="group cursor-pointer shadow-gray-300 shadow-lg bg-white border border-gray-200 rounded-xl transition-all duration-300 ease-out hover:scale-105 hover:bg-black hover:shadow-xl">
      <div className="bg-gray-200 rounded-t-xl transition-colors group-hover:bg-gray-800 flex justify-center items-center" style={{ aspectRatio: '3/4', width: '100%' }}>
        {item?.images?.length>0 && 
           <img src={item.images[0]} alt="" className="object-cover h-full w-full rounded-t-xl" style={{ aspectRatio: '3/4' }} />
        }
      </div>

      <div className="p-4">
        <h4 className="font-semibold text-lg text-gray-900 group-hover:text-white">
          {item.title}
        </h4>
        <p className="font-bold text-gray-900 group-hover:text-white">
          Price: ₹{item.price}
        </p>
        <p className="text-sm text-gray-600 group-hover:text-gray-300">
          Seller: {item.seller.name}
        </p>
        <p className="line-clamp-2 text-sm text-gray-600 group-hover:text-gray-300">
          Description: {item.description}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
