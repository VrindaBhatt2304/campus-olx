import React, { useContext , useEffect, useState} from 'react'
import UserContext from '../context/UserContext';
import ProductCard from '../components/ProductCard';

function Products() {

  const {cat:categories,prod:products}=useContext(UserContext);
  const [selectedCat,setSelectedCat]= useState("All");
  const [filterProd,setFilterProd] = useState(null);

  useEffect(()=>{
    function handleFilter(){
    const data=products?.filter((item)=> {
      if(selectedCat!='All')
      {
        if(item.category.title===selectedCat)
        {return item;}
      }
      else
      {return item;}
    })

    setFilterProd(data);
  }
  handleFilter();
  },[selectedCat,products]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-12 lg:px-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <div>
          <label htmlFor="category" className="mr-2 font-medium text-gray-700">
            Filter by Category:
          </label>
          <select
            onChange={(e)=>{
              setSelectedCat(e.currentTarget.value);
            }}
            id="category"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white"
          >
            <option value="All">--</option>
            {categories?.map((cat,key) => (
              <option key={key} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterProd?.map((item, idx) => (
          <ProductCard key={idx} item={item}/>
        ))}
      </div>
    </div>
  );
}

export default Products;