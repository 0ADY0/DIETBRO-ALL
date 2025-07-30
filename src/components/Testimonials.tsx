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
      name: "Adhythyan K S",
      role: "College Student",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "I have tried a lot of food subscriptions in Bangalore but either they were unhealthy or not customized. Dietbro has made me feel healthier and better. The meals are home cooked and its been helping me in daily workouts too."
    },
    {
      id: 2,
      name: "Jyothi Jangid",
      role: "Event Organizer",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "Have started my fitness journey few months ago and let me tell you that Dietbro has been my real friend till now. It was quite difficult to manage work and diet, but now I get breakfast, lunch and dinner delivered to my door with very affordable monthly subscription. Thanks to Dietbro for all they do."
    },
    {
      id: 3,
      name: "Santhosh Reddy",
      role: "Actor, Model, Entrepreneur",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "I wanted to have healthy meals but was blown away by the taste and quality. I said to myself 'if Dietbro can make healthy food taste this good, it's time to commit to my fitness goals'. The convenience and variety are unmatched!"
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
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight font-heading text-reveal">
            What our <span className="text-brand-green-600">Customers</span> are Saying?
          </h2>
        </div>

        {/* Testimonials Cards */}
        <div className="mb-16 text-reveal" style={{ animationDelay: '0.4s' }}>
          <div className="relative">
            {/* Testimonial Cards Container */}
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className="flex-shrink-0 w-80 sm:w-96 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {/* Quote */}
                  <blockquote className="text-gray-700 text-sm leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {/* Customer Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-xs">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrow */}
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-600 p-3 rounded-full transition-all hover:scale-110 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
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