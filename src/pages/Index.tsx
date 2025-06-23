import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import TravelForm from '@/components/TravelForm';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (data: { query: string; email: string; name: string }) => {
    setIsLoading(true);
    
    try {
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
          className: "border-red-500 bg-white text-gray-900",
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
        className: "border-red-500 bg-white text-gray-900",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exampleQueries = [
    {
      text: "Beachfront villa in Bali with private pool for 6 people",
      dates: "21st July to 23rd July 2025"
    },
    {
      text: "Modern apartment in Tokyo near train stations", 
      dates: "15th August to 18th August 2025"
    },
    {
      text: "Cozy cabin in the Swiss Alps with mountain views",
      dates: "10th September to 12th September 2025"
    }
  ];

  const handleExampleClick = (example: typeof exampleQueries[0]) => {
    const fullQuery = `${example.text} from ${example.dates}`;
    // This will be handled by the TravelForm component
  };

  return (
    <div className="min-h-screen bg-gradient-ocean font-poppins">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">airbnb</h1>
              <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                EXPERIMENTAL
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-red-500 mb-8 font-poppins">
            Airbnb Search
          </h1>
        </div>

        {/* Main Search Card */}
        <div className="max-w-4xl mx-auto">
          {!isSubmitted ? (
            <Card className="bg-white/95 backdrop-blur-sm border border-white/30 shadow-2xl rounded-2xl p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Describe your perfect stay
                </h2>
                
                {/* Example searches */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">Try these examples:</h3>
                  <div className="space-y-3">
                    {exampleQueries.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => handleExampleClick(example)}
                        className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-sm transition-all group"
                      >
                        <div className="text-sm text-gray-900 font-medium group-hover:text-red-600">
                          {example.text}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {example.dates}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <TravelForm onSubmit={handleFormSubmit} isLoading={isLoading} exampleQueries={exampleQueries} />
            </Card>
          ) : (
            <Card className="bg-white/95 backdrop-blur-sm border border-green-200 shadow-2xl rounded-2xl p-8 text-center">
              <div className="text-green-600 mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Search Submitted!</h2>
              <p className="text-gray-600 text-lg">
                We're searching through thousands of Airbnb properties to find your perfect match. 
                Check your email shortly for results.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/20 bg-white/10 backdrop-blur-sm py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-white/80">
              © 2025 Airbnb Search Experimental. This is an experimental search tool.
            </p>
            <p className="text-sm text-white/60 mt-2">
              🧪 Experimental Project - Results may vary
            </p>
          </div>
        </div>
      </footer>

      {/* Loading Overlay */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default Index;
