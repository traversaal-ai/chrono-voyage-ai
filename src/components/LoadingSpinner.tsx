
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-futuristic-orange border-opacity-20 rounded-full animate-spinner"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-futuristic-orange rounded-full animate-spinner"></div>
        </div>
        <div className="mt-6 text-white">
          <h3 className="text-xl font-bold text-futuristic-orange mb-2">AI Processing Your Request</h3>
          <p className="text-gray-300 animate-pulse">Analyzing destinations and crafting your perfect journey...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
