import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialsProps {
  onGetStarted: () => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onGetStarted }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Vaishpay Ramesh",
      role: "Actor/Model",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "Dietbro has completely transformed my mealtime routine! The meals are fresh, delicious, and perfectly portioned."
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Software Engineer",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "As a busy professional, Dietbro saves me so much time. The quality is outstanding and the variety keeps me excited about healthy eating."
    },
    {
      id: 3,
      name: "Arjun Patel",
      role: "Fitness Trainer",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "I recommend Dietbro to all my clients. The nutritional balance is perfect for anyone serious about their fitness goals."
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Marketing Manager",
      image: "https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "The convenience and taste of Dietbro meals have made healthy eating effortless. I've never felt better!"
    },
    {
      id: 5,
      name: "Rohit Kumar",
      role: "Entrepreneur",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "Dietbro understands what busy people need. Fresh, healthy meals delivered right to my door - it's a game changer!"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-10 sm:py-20 lg:py-28 bg-transparent relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-4 sm:mb-6 tracking-tight metropolis-heading text-reveal">
            Bangalore's #1 Meal Subscription choice
          </h2>
          <p className="text-base sm:text-xl text-gray-600 font-light max-w-3xl mx-auto text-reveal" style={{ animationDelay: '0.2s' }}>
            Dietbro is setting new standards for taste and quality with fresh, chef-crafted meals.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="mb-10 sm:mb-16 text-reveal" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-brand rounded-3xl p-4 sm:p-8 lg:p-12 relative overflow-hidden shadow-4xl hover:shadow-glow-lg transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green-500 to-brand-green-700 opacity-90"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full float"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/10 rounded-full float" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative z-10">
              <h3 className="text-lg sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-8 text-center metropolis-heading text-shadow-lg">
                Our Customer Testimonial about us
              </h3>

              {/* Testimonial Content */}
              <div className="relative">
                <div className="flex transition-transform duration-500 ease-in-out" 
                     style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0">
                      <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row items-center max-w-4xl mx-auto px-2">
                        {/* Quote */}
                        <div className="flex-1 text-center lg:text-left">
                          <div className="floating-card bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl relative hover:shadow-glow transition-all duration-500">
                            <div className="absolute -bottom-4 left-8 w-8 h-8 bg-white transform rotate-45"></div>
                            <blockquote className="text-gray-800 text-base sm:text-lg lg:text-xl font-medium italic leading-relaxed">
                              "{testimonial.quote}"
                            </blockquote>
                          </div>
                        </div>

                        {/* Profile */}
                        <div className="flex-shrink-0 text-center">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden mx-auto mb-2 sm:mb-4 border-4 border-white shadow-glow hover:scale-105 sm:hover:scale-110 transition-transform duration-300 interactive">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="text-white font-bold text-base sm:text-lg lg:text-xl mb-1">
                            {testimonial.name}
                          </h4>
                          <p className="text-brand-green-100 font-medium text-xs sm:text-base">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-card hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm hover:scale-110 interactive"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-card hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm hover:scale-110 interactive"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 sm:mt-8 gap-2 sm:gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide 
                        ? 'bg-white scale-125 glow' 
                        : 'bg-white/50 hover:bg-white/70'
                    } interactive`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative text-reveal" style={{ animationDelay: '0.6s' }}>
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop" 
              alt="Couple enjoying healthy meal"
              className="w-full h-48 sm:h-96 object-cover rounded-2xl shadow-4xl hover:shadow-glow transition-all duration-500 hover:scale-105 hover:rotate-1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl hover:from-brand-green-900/20 transition-all duration-500"></div>
          </div>

          <div className="space-y-8 text-reveal" style={{ animationDelay: '0.8s' }}>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold gradient-text leading-tight metropolis-heading">
              Eat healthy, live better.<br />
              Dietbro has you<br />
              covered.
            </h3>
            
            <p className="text-base sm:text-xl text-gray-600 leading-relaxed font-light">
              Join thousands of satisfied customers who have transformed their eating habits with our premium meal delivery service.
            </p>

            <button 
              onClick={onGetStarted}
              className="btn-primary bg-gradient-brand text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold hover:bg-brand-green-600 transition-all text-base sm:text-lg shadow-glow hover:shadow-glow-lg transform hover:-translate-y-2 hover:scale-105 interactive"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;