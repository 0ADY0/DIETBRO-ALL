import React from 'react';

interface HeroProps {
  onGetStarted?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="bg-gradient-to-r from-brand-green-500 to-brand-green-600 text-white py-20 lg:py-28 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-white rounded-full float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-reveal">
              Real Food.<br />
              Real Goals.<br />
              Real Results.
            </h1>
            
            <p className="text-xl lg:text-2xl text-brand-green-100 leading-relaxed font-light text-reveal" style={{ animationDelay: '0.2s' }}>
              Fuel your fitness journey with chef-crafted, nutritionally 
              optimized, eco-friendly meals across Bangalore.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 text-reveal" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={onGetStarted}
                className="btn-primary bg-white text-brand-green-500 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 interactive"
              >
                View Plans
              </button>
              <button 
                onClick={onGetStarted}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-brand-green-500 transition-all text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 interactive"
              >
                Subscribe Now
              </button>
            </div>
          </div>

          <div className="relative text-reveal" style={{ animationDelay: '0.6s' }}>
            <div className="floating-card bg-white rounded-3xl p-6 shadow-4xl hover:shadow-glow-lg transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1">
              <img 
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop" 
                alt="Healthy meal bowl" 
                className="w-full h-80 object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-2xl font-semibold shadow-lg text-sm transform rotate-3 hover:rotate-6 transition-transform bounce-subtle interactive">
              Fresh Daily
            </div>
            <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg text-sm transform -rotate-3 hover:-rotate-6 transition-transform bounce-subtle interactive" style={{ animationDelay: '1s' }}>
              Chef Crafted
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;