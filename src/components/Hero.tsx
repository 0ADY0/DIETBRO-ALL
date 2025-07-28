import React from 'react';
import { Menu, X, Star, Clock, Users, CheckCircle } from 'lucide-react'; // Added more icons

interface HeroProps {
  onGetStarted?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-green-50 via-brand-green-100 to-brand-green-200"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-brand-green-300 rounded-full float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-brand-green-300 rounded-full float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-brand-green-300 rounded-full float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-brand-green-300 rounded-full float" style={{ animationDelay: '0.5s' }}></div>
        {/* Add more floating elements */}
        <div className="absolute top-1/4 left-1/3 w-12 h-12 bg-brand-green-400 rounded-full float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-brand-green-400 rounded-full float" style={{ animationDelay: '2.5s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Enhanced Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight text-reveal font-heading text-brand-green-600 text-shadow-lg">
              Real Food.<br />
              <span className="bg-gradient-to-r from-brand-green-600 to-brand-green-400 bg-clip-text text-transparent">
                Real Goals.
              </span><br />
              Real Results.
            </h1>
            
            {/* Enhanced Subtitle */}
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-light text-reveal" style={{ animationDelay: '0.2s' }}>
              Fuel your fitness journey with chef-crafted, nutritionally 
              optimized, eco-friendly meals across Bangalore.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 text-reveal" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={onGetStarted}
                className="group relative bg-gradient-to-r from-brand-green-500 to-brand-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-brand-green-600 hover:to-brand-green-700 transition-all text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 interactive overflow-hidden"
              >
                <span className="relative z-10">View Plans</span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-green-600 to-brand-green-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button 
                onClick={onGetStarted}
                className="group relative border-2 border-brand-green-500 text-brand-green-500 px-8 py-4 rounded-xl font-semibold hover:bg-brand-green-500 hover:text-white transition-all text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 interactive overflow-hidden"
              >
                <span className="relative z-10">Subscribe Now</span>
                <div className="absolute inset-0 bg-brand-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>

          <div className="relative text-reveal" style={{ animationDelay: '0.6s' }}>
            {/* Rotating Meal Gallery */}
            <div className="relative w-full h-80">
              {/* Center Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="floating-card bg-white rounded-3xl p-6 shadow-4xl hover:shadow-glow-lg transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 border border-gray-100 w-64 h-64">
                  <img 
                    src="/Spicy peanut tofu[1].jpg" 
                    alt="Spicy peanut tofu meal" 
                    className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Rotating Images - 4 Random Positions */}
              <div className="absolute inset-0 animate-spin-slow">
                {/* Image 1 - Butter Chicken Style Tofu Bowl */}
                <div className="absolute top-4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white">
                    <img 
                      src="/Spicy peanut tofu[1].jpg" 
                      alt="Butter chicken style tofu bowl" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Image 2 - Teriyaki Chicken Rice */}
                <div className="absolute top-1/3 right-6 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white">
                    <img 
                      src="/Spicy peanut tofu[1].jpg" 
                      alt="Teriyaki chicken rice" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Image 3 - Honey Garlic Grilled Chicken Thighs */}
                <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white">
                    <img 
                      src="/Spicy peanut tofu[1].jpg" 
                      alt="Honey garlic grilled chicken thighs" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Image 4 - Honey Chicken General Bowl */}
                <div className="absolute bottom-8 right-1/3 transform translate-x-1/2 translate-y-1/2">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white">
                    <img 
                      src="/Spicy peanut tofu[1].jpg" 
                      alt="Honey chicken general bowl" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Enhanced Floating Badges */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-brand-green-500 to-brand-green-600 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg text-sm transform rotate-3 hover:rotate-6 transition-transform bounce-subtle interactive">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  Fresh Daily
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-brand-green-600 to-brand-green-700 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg text-sm transform -rotate-3 hover:-rotate-6 transition-transform bounce-subtle interactive" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Chef Crafted
                </div>
              </div>
              
              {/* New Floating Badge */}
              <div className="absolute top-1/2 -left-4 bg-white/90 backdrop-blur-sm text-brand-green-600 px-3 py-2 rounded-xl font-semibold shadow-lg text-xs transform -rotate-12 hover:rotate-0 transition-transform interactive">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  30 min
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
