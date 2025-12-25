import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { uploadImageToCloudinary } from "../config/cloudinary";
import {toast} from "react-toastify";

function MyProfile() {

  const [products, setProducts] = useState([]);
  const { user, setUser, prod, setProd } = useContext(UserContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/getuser", {
        headers:{"Authorization":`Bearer ${token}`},
      })
      .then((response)=>{
        setUser(response.data.user);
      })
      .catch((e)=>{
        console.log("No user found:",e)
    })

    axios
      .get(`http://localhost:5000/product/user`, {headers:{"Authorization":`Bearer ${token}`}})
      .then((response)=>{
        console.log(response);
        setProducts(response.data);
      })
      .catch((e) => {
        console.log("Product not found:", e)
    });
  }, []);



  // Ref for file input
  const fileInputRef = useRef(null);

  // Handler for edit button
  const handleEditImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();

    }
  };

  // Handler for file change (to be implemented)
  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Logic to upload or preview the image can be added here
      const img_link=await uploadImageToCloudinary(file);
      console.log(img_link);
      axios.put(`http://localhost:5000/user/updateuser`,{picture:img_link},{
        headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}
      }).then(response=>{
        console.log(response);
        setUser(response.data);
      }).catch((e)=>{
        console.log(e);
        toast.error("Error Occured!!");
      })

      alert(`Selected file: ${file.name}`);
    }
  };

  async function handleDelete(id) {
    try{
      axios.delete(`http://localhost:5000/product/${id}`,{
        headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}
      }).then((response)=>{
        console.log(response);
        const temp=prod.filter(i=>i._id !== id)
        const temp2=products.filter(i=>i._id !== id)
        setProd(temp);
        setProducts(temp2);
      })
    }
    catch(e){
      console.log(e);
    }
  }

  async function handleUpdate(id){
    try{
      axios.patch(`http://localhost:5000/product/${id}`,{isSold:true},{
        headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}
      }).then((response)=>{
        console.log(response);
        const temp=prod.filter(i=>i._id !== id)
        const temp2=products
        temp2.map(i=>{
          
          if(i._id === id )
          {
            i.isSold=true;
          }
         })

        setProd(temp);
        setProducts(temp2);
      })
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-16 lg:px-32">
      <div className="flex flex-col md:flex-row gap-12 bg-white p-8 rounded-2xl shadow-md mb-16">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center md:items-start justify-center md:justify-start mr-0 md:mr-8">
          <div className="relative w-36 h-36 mb-4">
            <img
              src={user?.picture || 'https://ui-avatars.com/api/?name=' + (user?.name || 'User')}
              alt="Profile"
              className="w-36 h-36 object-cover rounded-full border-4 border-gray-200 shadow"
            />
            <button
              onClick={handleEditImage}
              className="absolute bottom-2 right-2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition"
              title="Edit profile image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L7.5 19.79l-4 1 1-4 13.362-13.303z" />
              </svg>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        {/* Profile Details Section */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">My Profile</h1>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1 capitalize">Name</label>
              <input
                type="text"
                value={user?.name}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1 capitalize">College</label>
              <input
                type="text"
                value={user?.college}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1 capitalize">Email</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1 capitalize">phone</label>
              <input
                type="number"
                value={user?.phone}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          My Products
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.length ? (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{product.title}</td>
                    <td className="p-3">{product.category.title}</td>
                    <td className="p-3">₹{product.price}</td>
                    <td className="p-3 flex gap-3">
                      
                      {product.isSold ? <span className="text-sm px-4 py-2 text-green-600 bg-green-100 rounded-3xl hover:bg-green-300 duration-300">Sold</span> : 
                      <button 
                      onClick={()=>{handleUpdate(product._id)}}
                      className="cursor-pointer text-sm text-white px-5 py-2 bg-black shadow rounded-3xl">Sell</button>}
                      <button 
                      onClick={()=>{handleDelete(product._id)}}
                      className="cursor-pointer text-sm text-white px-5 py-2 bg-red-500 shadow rounded-3xl">Delete</button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No products added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
