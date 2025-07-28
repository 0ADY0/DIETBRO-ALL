import React from 'react';
import { Menu, X } from 'lucide-react'; // These imports are not used in Hero.tsx, can be removed if not needed elsewhere in this file

interface HeroProps {
  onGetStarted?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="bg-white text-gray-900 py-20 lg:py-28 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-brand-green-200 rounded-full float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-brand-green-200 rounded-full float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-brand-green-200 rounded-full float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-brand-green-200 rounded-full float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            {/* Changed metropolis-bold to font-oswald for consistency */}
            <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-reveal font-oswald text-brand-green-600">
              Real Food.<br />
              Real Goals.<br />
              Real Results.
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light text-reveal" style={{ animationDelay: '0.2s' }}>
              Fuel your fitness journey with chef-crafted, nutritionally 
              optimized, eco-friendly meals across Bangalore.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 text-reveal" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={onGetStarted}
                className="btn-primary bg-brand-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-green-600 transition-all text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 interactive"
              >
                View Plans
              </button>
              <button 
                onClick={onGetStarted}
                className="border-2 border-brand-green-500 text-brand-green-500 px-8 py-4 rounded-xl font-semibold hover:bg-brand-green-500 hover:text-white transition-all text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 interactive"
              >
                Subscribe Now
              </button>
            </div>
          </div>

          <div className="relative text-reveal" style={{ animationDelay: '0.6s' }}>
            <div className="floating-card bg-white rounded-3xl p-6 shadow-4xl hover:shadow-glow-lg transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 border border-gray-100">
              <img 
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop" 
                alt="Healthy meal bowl" 
                className="w-full h-80 object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-brand-green-500 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg text-sm transform rotate-3 hover:rotate-6 transition-transform bounce-subtle interactive">
              Fresh Daily
            </div>
            <div className="absolute -bottom-4 -left-4 bg-brand-green-600 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg text-sm transform -rotate-3 hover:-rotate-6 transition-transform bounce-subtle interactive" style={{ animationDelay: '1s' }}>
              Chef Crafted
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
