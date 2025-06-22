
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import ParticlesBackground from '@/components/ParticlesBackground';
import LoadingSpinner from '@/components/LoadingSpinner';
import HeroSection from '@/components/HeroSection';
import TravelForm from '@/components/TravelForm';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState('');
  const { toast } = useToast();

  const handleFormSubmit = async (data: { query: string; email: string; name: string }) => {
    setIsLoading(true);
    
    try {
      // Create URL with parameters
      const webhookUrl = new URL('https://n8n.srv874091.hstgr.cloud/webhook/2586fd7a-0113-4719-8038-9b59cbcea6e0');
      webhookUrl.searchParams.append('query', data.query);
      webhookUrl.searchParams.append('email', data.email);
      webhookUrl.searchParams.append('name', data.name);

      console.log('Sending request to:', webhookUrl.toString());
      
      const response = await fetch(webhookUrl.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "🏠 Search Submitted Successfully!",
          description: "We're finding the perfect Airbnb listings for you. Check your email shortly!",
          className: "border-gray-300 bg-white text-black",
        });
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending request:', error);
      toast({
        title: "❌ Connection Error",
        description: "Unable to process your search. Please check your connection and try again.",
        variant: "destructive",
        className: "border-gray-300 bg-white text-black",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (query: string) => {
    setSelectedQuery(query);
  };

  const exampleQueries = [
    "Beachfront villa in Bali with private pool for 6 people, December 15-22, 2025",
    "Modern apartment in Tokyo near train stations, August 10-17, 2026",
    "Cozy cabin in the Swiss Alps with mountain views, January 10-17, 2026"
  ];

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      <ParticlesBackground />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-2xl mx-auto">
          {!isSubmitted ? (
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-300 shadow-xl p-8 animate-slide-up">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Find Your Perfect Airbnb
                </h2>
                <p className="text-gray-700 text-lg mb-6">
                  Describe your ideal home away from home and we'll find the best listings worldwide
                </p>
                
                {/* Example queries */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-semibold text-black mb-2">Example searches:</h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    {exampleQueries.map((query, index) => (
                      <p key={index} className="cursor-pointer hover:text-red-600 hover:bg-gray-100 p-2 rounded transition-colors" onClick={() => handleExampleClick(query)}>
                        • "{query}"
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <TravelForm onSubmit={handleFormSubmit} isLoading={isLoading} selectedQuery={selectedQuery} />
            </Card>
          ) : (
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-300 shadow-xl p-8 animate-slide-up text-center">
              <div className="text-green-600 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black mb-4">Search Submitted!</h2>
              <p className="text-gray-700 text-lg">
                You will find your listings shortly. We're searching through thousands of Airbnb properties to find your perfect match.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Experimental Notice */}
      <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg p-3 shadow-lg">
        <p className="text-xs text-gray-600">
          🧪 Experimental Project
        </p>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-300 bg-white/50 backdrop-blur-sm py-8 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            © 2025 Airbnb Home Searches. Find unique stays worldwide.
          </p>
        </div>
      </footer>

      {/* Loading Overlay */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default Index;
