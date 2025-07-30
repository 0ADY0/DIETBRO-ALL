import React from 'react';
import { ChefHat, Truck, Users } from 'lucide-react';

interface HowItWorksProps {
  onGetStarted?: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onGetStarted }) => {
  const steps = [
    {
      number: "1",
      title: "Choose your meals",
      description: "Get 10 new customizable meals each week",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      icon: <ChefHat className="w-8 h-8 text-brand-green-500" />
    },
    {
      number: "2",
      title: "We cook for you",
      description: "Receive your chef-crafted meals right to your doorstep",
      image: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      icon: <Truck className="w-8 h-8 text-brand-green-500" />
    },
    {
      number: "3",
      title: "Heat, eat and repeat",
      description: "Ready to eat in 90 seconds. Enjoy your meal",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      icon: <Users className="w-8 h-8 text-brand-green-500" />
    }
  ];

  return (
    <section className="py-6 sm:py-12 lg:py-16 bg-transparent relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          {/* Apply font-gagalin for the main heading */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-4 sm:mb-6 tracking-tight font-metropolis text-reveal">
            How Dietbro Works:
          </h2>
          <p className="text-base sm:text-xl text-gray-600 font-light max-w-2xl mx-auto text-reveal" style={{ animationDelay: '0.2s' }}>
            Save time and enjoy nutritious ready-to-eat meals in 3 easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group stagger-animation px-2">
              <div className="relative mb-6 hover-lift">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-36 sm:h-48 object-cover rounded-2xl shadow-lg group-hover:shadow-glow transition-all duration-500 hover:scale-105"
                />
                {/* Apply font-oswald for the numbers */}
                <div className="absolute -top-3 -left-3 bg-gradient-brand text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-2xl font-oswald shadow-glow pulse-slow">
                  {step.number}
                </div>
              </div>
              
              <div className="flex justify-center mb-2 sm:mb-4 bounce-subtle" style={{ animationDelay: `${index * 0.5}s` }}>
                {step.icon}
              </div>
              
              {/* Apply font-oswald for the step titles */}
              <h3 className="text-base sm:text-xl font-bold gradient-text mb-2 sm:mb-3 font-oswald text-shadow">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed font-light text-sm sm:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-16">
          <button 
            onClick={onGetStarted}
            className="btn-primary bg-gradient-brand text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold hover:bg-brand-green-600 transition-all text-base sm:text-lg shadow-glow hover:shadow-glow-lg transform hover:-translate-y-2 hover:scale-105 interactive"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
