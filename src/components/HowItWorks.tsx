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
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=fit",
      icon: <Users className="w-8 h-8 text-brand-green-500" />
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-green-200 rounded-full rotate-slow"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-brand-green-200 rounded-full rotate-slow" style={{ animationDirection: 'reverse' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Corrected: Applied bg-gradient-brand to match numbers and button */}
          <h2 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-brand mb-6 tracking-tight gagalin-heading text-reveal">
            How Dietbro works:
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto text-reveal" style={{ animationDelay: '0.2s' }}>
            Save time and enjoy nutritious ready-to-eat meals in 3 easy steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group stagger-animation">
              <div className="relative mb-6 hover-lift">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-48 object-cover rounded-2xl shadow-lg group-hover:shadow-glow transition-all duration-500 hover:scale-105"
                />
                <div className="absolute -top-4 -left-4 bg-gradient-brand text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-glow pulse-slow">
                  {step.number}
                </div>
              </div>
              
              <div className="flex justify-center mb-4 bounce-subtle" style={{ animationDelay: `${index * 0.5}s` }}>
                {step.icon}
              </div>
              
              <h3 className="text-xl font-bold gradient-text mb-3 metropolis-subheading text-shadow">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={onGetStarted}
            className="btn-primary bg-gradient-brand text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-green-600 transition-all text-lg shadow-glow hover:shadow-glow-lg transform hover:-translate-y-2 hover:scale-105 interactive"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
