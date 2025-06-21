
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TravelFormProps {
  onSubmit: (data: { query: string; email: string; name: string }) => void;
  isLoading: boolean;
}

const TravelForm: React.FC<TravelFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    query: '',
    email: '',
    name: ''
  });

  const [errors, setErrors] = useState({
    query: '',
    email: '',
    name: ''
  });

  const validateForm = () => {
    const newErrors = {
      query: '',
      email: '',
      name: ''
    };

    if (!formData.query.trim()) {
      newErrors.query = 'Please describe your dream destination';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="query" className="block text-sm font-medium text-gray-300 mb-2">
          Dream Destination
        </label>
        <textarea
          id="query"
          rows={4}
          className="glass-input w-full p-4 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none"
          placeholder="Describe your dream destination... (e.g., 'A romantic getaway to a tropical island with crystal clear waters and luxury resorts')"
          value={formData.query}
          onChange={(e) => handleInputChange('query', e.target.value)}
          disabled={isLoading}
        />
        {errors.query && <p className="mt-1 text-sm text-futuristic-red">{errors.query}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Your Name
          </label>
          <Input
            id="name"
            type="text"
            className="glass-input text-white placeholder-gray-400 focus:outline-none"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={isLoading}
          />
          {errors.name && <p className="mt-1 text-sm text-futuristic-red">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            className="glass-input text-white placeholder-gray-400 focus:outline-none"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={isLoading}
          />
          {errors.email && <p className="mt-1 text-sm text-futuristic-red">{errors.email}</p>}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-orange hover:shadow-lg hover:shadow-futuristic-orange/30 text-black font-bold py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-black border-opacity-20 rounded-full animate-spinner mr-2"></div>
            <div className="absolute w-5 h-5 border-2 border-transparent border-t-black rounded-full animate-spinner mr-2"></div>
            Processing...
          </span>
        ) : (
          <>
            🚀 Generate My Travel Plan
          </>
        )}
      </Button>

      <p className="text-xs text-gray-400 text-center">
        Your personalized travel itinerary will be sent to your email within minutes
      </p>
    </form>
  );
};

export default TravelForm;
