
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
      newErrors.query = 'Please describe your ideal Airbnb';
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
        <label htmlFor="query" className="block text-sm font-medium text-white mb-2">
          Describe Your Ideal Stay (Include dates for best results)
        </label>
        <textarea
          id="query"
          rows={4}
          className="w-full p-4 rounded-lg border border-white/30 focus:border-white focus:ring-2 focus:ring-white/20 transition-all text-white placeholder-white/60 resize-none focus:outline-none bg-black/50"
          placeholder="e.g., 'Oceanfront villa in Santorini with infinity pool and sunset views for 4 guests, July 15-22, 2025'"
          value={formData.query}
          onChange={(e) => handleInputChange('query', e.target.value)}
          disabled={isLoading}
        />
        {errors.query && <p className="mt-1 text-sm text-red-400">{errors.query}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
            Your Name
          </label>
          <Input
            id="name"
            type="text"
            className="border-white/30 focus:border-white focus:ring-white/20 text-white placeholder-white/60 bg-black/50"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={isLoading}
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            className="border-white/30 focus:border-white focus:ring-white/20 text-white placeholder-white/60 bg-black/50"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={isLoading}
          />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-white to-white/90 hover:from-white/90 hover:to-white text-black font-bold py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-black border-opacity-20 rounded-full animate-spin mr-2"></div>
            Searching...
          </span>
        ) : (
          <>
            🔍 Find My Perfect Airbnb
          </>
        )}
      </Button>

      <p className="text-xs text-white/60 text-center">
        Your personalized Airbnb listings will be sent to your email within minutes
      </p>
    </form>
  );
};

export default TravelForm;
