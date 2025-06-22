
import React from 'react';

const ParticlesBackground = () => {
  return (
    <div className="particles">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}
      
      {/* Subtle gradient overlays for depth */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(0, 0, 0, 0.1) 0%, transparent 50%)',
        }}
      />
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: 'radial-gradient(circle at 80% 70%, rgba(0, 0, 0, 0.1) 0%, transparent 50%)',
        }}
      />
    </div>
  );
};

export default ParticlesBackground;
