import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { uploadImageToCloudinary } from "../config/cloudinary";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const {cat, user, setProd}=useContext(UserContext);
  const navigate=useNavigate();
  // For previewing selected images (optional, no logic here)
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleAddProduct=async()=>{
    const image_array=[];
    for(const img of images){
      const img_link=await uploadImageToCloudinary(img);
      image_array.push(img_link);
    }
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/create`,{title, price,description,category,seller:user._id,images:image_array},
        {headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}}
    ).then(response=>{
        if(response.status===201)
        setProd((prev)=> [...prev,response.data]);
        toast.success("Product Addded Successfully!!");
        navigate("/");
    }).catch((e)=>{
        console.log(e);
        toast.error("Some Error occured!!");
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-16 lg:px-32">
      <div className="flex flex-col md:flex-row gap-12 w-full">
        {/* Image Preview Section */}

        <div className="flex-1 flex-col flex items-start justify-center space-y-3">
          <div className="w-full max-w-2xl h-[400px] bg-gray-200 rounded-2xl shadow-md flex items-center justify-center overflow-hidden">
            {images.length > 0 ? (
              <img
                src={URL.createObjectURL(images[0])}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400">Image Preview</span>
            )}
          </div>
          <div className="flex justify-between align-center space-x-3 w-full">
            {images.slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt={`Preview ${idx + 1}`}
                className="object-cover h-20 w-20 bg-gray-200 rounded-2xl shadow-md"
              />
            ))}
          </div>
        </div>
        

        <div className="flex-1 flex flex-col gap-6 justify-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add Product</h1>
            <div className="flex flex-col gap-6">
              <label className="block text-lg font-medium text-gray-800 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                placeholder="Enter product title"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1">Category</label>
              <select
                onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
              >
                <option value="">Select category</option>
                {cat?.map((item,c) => (
                  <option key={c} value={item._id}>{item.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1">Price</label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                placeholder="Enter price"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white min-h-[120px]"
                placeholder="Enter product description"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1">Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
              />
            </div>
            <button
              onClick={handleAddProduct}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all w-fit text-lg mt-4"
            >
              Add Product
            </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;