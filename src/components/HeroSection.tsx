
import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative text-center py-24 px-4">
      <div className="container mx-auto relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-futuristic-orange via-white to-futuristic-red bg-clip-text text-transparent">
            AI Travel Agent
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up">
          Experience the future of travel planning with our advanced AI technology. 
          Discover personalized destinations, unique experiences, and seamless itineraries 
          tailored just for you.
        </p>
        
        <div className="flex justify-center space-x-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="px-4 py-2 bg-gradient-glass border border-glass-border rounded-full">
            <span className="text-futuristic-orange font-semibold">✨ AI-Powered</span>
          </div>
          <div className="px-4 py-2 bg-gradient-glass border border-glass-border rounded-full">
            <span className="text-futuristic-orange font-semibold">⚡ Instant Results</span>
          </div>
          <div className="px-4 py-2 bg-gradient-glass border border-glass-border rounded-full">
            <span className="text-futuristic-orange font-semibold">🌍 Global Destinations</span>
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-futuristic-orange opacity-10 rounded-full blur-3xl animate-pulse-orange"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-futuristic-red opacity-10 rounded-full blur-3xl animate-pulse-orange" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default HeroSection;
