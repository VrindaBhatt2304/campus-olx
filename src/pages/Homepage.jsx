import React from "react";


export default function Home() {
  return (
    <div className="min-h-screen bg-teal-600 font-sans">
      

      <nav className="bg-teal-700 shadow-md">
        <div className="w-full px-12 py-5 flex items-center justify-between">
          
          <span className="text-2xl font-semibold text-white">CampusOLX</span>

          
          <div className="flex items-center flex-1 mx-8">
            <div className="flex w-full max-w-xl rounded-lg overflow-hidden border border-teal-600">
              <input
                type="text"
                placeholder="Search products on CampusOLX"
                className="flex-1 px-4 py-2 text-white placeholder-white focus:outline-none bg-teal-500"
              />
              <button className="px-6 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition-colors">
               Search
              </button>
            </div>
          </div>

          <button className="px-6 py-2 rounded-lg bg-coral-500 text-white font-medium hover:bg-coral-600 transition-colors">
            Login
          </button>
        </div>
      </nav>

      <section className="px-12 mt-12">
        <div className="max-w-7xl mx-auto bg-coral-500 rounded-2xl p-14 text-white">
          <h2 className="text-4xl font-bold mb-4">Buy & Sell Within Your Campus</h2>
          <p className="text-lg opacity-90">
            A simple marketplace for books, electronics and essentials.
          </p>
        </div>
      </section>

      <section className="px-12 mt-8">
        <div className="max-w-7xl mx-auto flex gap-3 flex-wrap">
          {["Books", "Electronics", "Furniture", "Cycles", "Hostel Items", "Others"].map(
            (item, i) => (
              <button
                key={i}
                className="px-5 py-2 rounded-full bg-teal-500 border border-teal-700 text-white hover:bg-teal-700 transition-colors"
              >
                {item}
              </button>
            )
          )}
        </div>
      </section>

      <section className="px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-semibold text-white mb-6">Recent Listings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-coral-500 border border-coral-600 rounded-xl hover:bg-coral-600 transition-colors"
              >
                <div className="h-40 bg-coral-500 rounded-t-xl"></div>
                <div className="p-4">
                  <h4 className="font-semibold text-lg text-white">Sample Product</h4>
                  <p className="text-white font-bold">₹1,200</p>
                  <p className="text-sm text-white">Near Campus</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
