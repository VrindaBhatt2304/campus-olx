import React from 'react';

const SellerInformationModal = ({ isOpen, onClose, seller }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="bg-gray-100 rounded-2xl shadow-2xl p-10 min-w-[350px] max-w-lg w-full relative border border-gray-200">
        <button
          className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-gray-700 focus:outline-none transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-gray-750 via-black to-gray-900 flex items-center justify-center mb-4 shadow-md">
            <span className="text-3xl text-white font-bold">{seller?.name?.[0]?.toUpperCase() || '?'}</span>
          </div>
          <h2 className="text-3xl font-extrabold mb-2 text-gray-800 tracking-tight">Seller Information</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gray-750 via-black to-gray-900 rounded-full mb-6" />
          <div className="space-y-4 w-full text-center">
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-sm">Name</span>
              <span className="font-semibold text-lg text-gray-800">{seller?.name || 'N/A'}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-sm">Phone</span>
              <span className="font-semibold text-lg text-gray-800">{seller?.phone || 'N/A'}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-sm">Email</span>
              <span className="font-semibold text-lg text-gray-800">{seller?.email || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInformationModal;
