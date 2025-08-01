import React from 'react';
import { Check, Clock, Award, Leaf } from 'lucide-react';

interface FeaturesProps {
  onGetStarted?: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onGetStarted }) => {
  const features = [
    {
      title: "Fresh. Nutritious. Satisfying.",
      description: "Chef-prepared, dietitian-approved meals made from locally sourced ingredients from trusted partners.",
      icon: <Leaf className="w-6 h-6 text-brand-green-500" />
    },
    {
      title: "No prep required meals.",
      description: "Skip the meal prep with ready-to-eat, high-quality prepared meals at home/office. Crafted by our team of culinary experts.",
      icon: <Clock className="w-6 h-6 text-brand-green-500" />
    },
    {
      title: "Dietitian-crafted meals.",
      description: "Registered dietitians ensure every meal meets premium nutritional standards.",
      icon: <Award className="w-6 h-6 text-brand-green-500" />
    }
  ];

  return (
    <section className="py-12 lg:py-20 bg-transparent relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="relative text-reveal">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop" 
              alt="Person enjoying healthy meal"
              className="w-full h-96 object-cover rounded-2xl shadow-4xl hover:shadow-glow transition-all duration-500 hover:scale-105 hover:rotate-1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl hover:from-brand-green-900/20 transition-all duration-500"></div>
          </div>

          <div className="space-y-8 text-reveal" style={{ animationDelay: '0.3s' }}>
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4 stagger-animation hover-lift floating-card p-4 rounded-xl">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center shadow-glow pulse-slow">
                  {feature.icon}
                </div>
                <div>
                  {/* Changed metropolis-subheading to font-oswald for consistency */}
                  <h3 className="text-xl font-bold text-brand-green-500 mb-3 font-oswald text-shadow">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="text-center mt-10 sm:mt-16">
              <div className="flex flex-col items-center">
                <button 
                  onClick={onGetStarted}
                  className="btn-primary bg-brand-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-green-600 transition-all text-lg shadow-glow hover:shadow-glow-lg transform hover:-translate-y-2 hover:scale-105 interactive"
                >
                  Get Offer
                </button>
                <p className="text-sm text-gray-500 mt-3 font-light">
                  Skip or cancel any time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
