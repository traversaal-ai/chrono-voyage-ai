
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
        toast({
          title: "🚀 Request Sent Successfully!",
          description: "Our AI travel agent is processing your dream destination. You'll receive a personalized travel plan via email shortly.",
          className: "border-futuristic-orange bg-gradient-glass text-white",
        });
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending request:', error);
      toast({
        title: "❌ Connection Error",
        description: "Unable to connect to our AI travel agent. Please check your connection and try again.",
        variant: "destructive",
        className: "border-futuristic-red bg-gradient-glass text-white",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-futuristic text-white relative overflow-hidden">
      <ParticlesBackground />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-2xl mx-auto">
          <Card className="glass-card p-8 animate-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-futuristic-orange mb-4">
                Plan Your Next Adventure
              </h2>
              <p className="text-gray-300 text-lg">
                Describe your dream destination and let our AI create the perfect travel experience for you
              </p>
            </div>

            <TravelForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="glass-card p-6 text-center animate-float">
            <div className="w-16 h-16 bg-gradient-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-bold text-futuristic-orange mb-2">AI-Powered Planning</h3>
            <p className="text-gray-300">Advanced AI algorithms analyze your preferences to create personalized travel itineraries</p>
          </Card>

          <Card className="glass-card p-6 text-center animate-float" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-futuristic-orange mb-2">Instant Results</h3>
            <p className="text-gray-300">Get comprehensive travel plans delivered to your email within minutes</p>
          </Card>

          <Card className="glass-card p-6 text-center animate-float" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-16 bg-gradient-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌟</span>
            </div>
            <h3 className="text-xl font-bold text-futuristic-orange mb-2">Premium Experience</h3>
            <p className="text-gray-300">Curated recommendations for accommodations, activities, and hidden gems</p>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-glass-border bg-gradient-glass py-8 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2024 AI Travel Agent. Powered by advanced artificial intelligence.
          </p>
        </div>
      </footer>

      {/* Loading Overlay */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default Index;
