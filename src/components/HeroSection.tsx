
import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative text-center py-24 px-4">
      {/* Subtle red gradient background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, transparent 50%, rgba(239, 68, 68, 0.05) 100%)',
        }}
      />
      
      <div className="container mx-auto relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
            Airbnb Home Searches
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up">
          Discover unique homes and experiences around the world. 
          From cozy apartments to luxury villas, find your perfect stay 
          with our intelligent search powered by AI.
        </p>
        
        <div className="flex justify-center space-x-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full">
            <span className="text-black font-semibold">🏠 Global Listings</span>
          </div>
          <div className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full">
            <span className="text-black font-semibold">⚡ Instant Search</span>
          </div>
          <div className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full">
            <span className="text-black font-semibold">🌍 Worldwide</span>
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-200 opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gray-300 opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default HeroSection;
