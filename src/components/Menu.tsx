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
    <section className="relative py-8 sm:py-16 bg-transparent overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          {/* Apply font-gagalin for the main heading */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-brand-green-500 mb-4 sm:mb-6 tracking-tight font-metropolis text-reveal">
            Explore Our Menu
          </h2>
          <p className="text-base sm:text-xl text-gray-600 font-medium max-w-2xl mx-auto text-reveal" style={{ animationDelay: '0.2s' }}>
            Browse the 40 gourmet prepared meals featured on this month's menu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="floating-card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-glow transition-all duration-500 group stagger-animation hover-lift mx-2">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-40 sm:h-64 object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 glass-card px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 bounce-subtle">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                {/* Apply font-oswald for the menu item names */}
                <h3 className="text-base sm:text-xl font-bold text-brand-green-500 mb-2 font-heading text-shadow">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm font-medium">
                  Chef-crafted with premium ingredients
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-16">
          <button 
            onClick={onGetStarted}
            className="btn-primary bg-brand-green-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold hover:bg-brand-green-600 transition-all text-base sm:text-lg shadow-glow hover:shadow-glow-lg transform hover:-translate-y-2 hover:scale-105 interactive"
          >
            Explore menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
