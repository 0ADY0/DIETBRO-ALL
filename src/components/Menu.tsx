import React from 'react';
import { Star, ArrowLeft } from 'lucide-react';

interface MenuProps {
  onGetStarted?: () => void;
  // Add any other props needed for header/footer navigation if this component uses them
  onMenuClick?: () => void;
  onPlansClick?: () => void;
  onLocationsClick?: () => void;
  onOrdersClick?: () => void;
  onBlogsClick?: () => void;
  onFAQClick?: () => void;
  onBack?: () => void;
  onLogoClick?: () => void;
}

const Menu: React.FC<MenuProps> = ({ onGetStarted, onMenuClick, onPlansClick, onLocationsClick, onOrdersClick, onBlogsClick, onFAQClick, onBack, onLogoClick }) => {
  const menuItems = [
    {
      name: "Butter chicken bowl",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      rating: 4.8
    },
    {
      name: "Roasted shrimp pasta",
      image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      rating: 4.9
    },
    {
      name: "Lasagna style pasta",
      image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      rating: 4.7
    }
  ];

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-40 h-40 bg-brand-green-200 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-brand-green-200 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Apply font-gagalin for the main heading */}
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6 tracking-tight font-metropolis text-reveal">
            Explore Our Menu
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto text-reveal" style={{ animationDelay: '0.2s' }}>
            Browse the 40 gourmet prepared meals featured on this month's menu
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="floating-card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-glow transition-all duration-500 group stagger-animation hover-lift">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 glass-card px-3 py-1 rounded-full flex items-center gap-1 bounce-subtle">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                {/* Apply font-oswald for the menu item names */}
                <h3 className="text-xl font-bold gradient-text mb-2 font-heading text-shadow">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm font-light">
                  Chef-crafted with premium ingredients
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={onGetStarted}
            className="btn-primary bg-gradient-brand text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-green-600 transition-all text-lg shadow-glow hover:shadow-glow-lg transform hover:-translate-y-2 hover:scale-105 interactive"
          >
            Explore menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
