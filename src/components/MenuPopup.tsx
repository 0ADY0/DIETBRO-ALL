import React, { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';

interface MenuPopupProps {
  onBack: () => void;
  onGetStarted: () => void;
  onFAQClick: () => void;
  onPlansClick?: () => void;
  onLocationsClick?: () => void;
}

const MenuPopup: React.FC<MenuPopupProps> = ({ onBack, onGetStarted, onFAQClick, onPlansClick, onLocationsClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('Signature Meals');

  const categories = [
    { id: 'signature', name: 'Signature Meals', active: true },
    { id: 'high-protein', name: 'High Protein', active: false },
    { id: 'balanced', name: 'Balanced Meals', active: false }
  ];

  const mealItems = [
    {
      id: 1,
      name: 'Butter chicken-style tofu bowl',
      category: 'High Protein',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Butter chicken-style tofu bowl',
      category: 'Balanced Meals',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Butter chicken-style tofu bowl',
      category: 'High Protein',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Butter chicken-style tofu bowl',
      category: 'Balanced Meals',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 5,
      name: 'Butter chicken-style tofu bowl',
      category: 'High Protein',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 6,
      name: 'Butter chicken-style tofu bowl',
      category: 'Balanced Meals',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 7,
      name: 'Butter chicken-style tofu bowl',
      category: 'High Protein',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 8,
      name: 'Butter chicken-style tofu bowl',
      category: 'Balanced Meals',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 9,
      name: 'Butter chicken-style tofu bowl',
      category: 'High Protein',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 10,
      name: 'Butter chicken-style tofu bowl',
      category: 'Balanced Meals',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 11,
      name: 'Butter chicken-style tofu bowl',
      category: 'High Protein',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 12,
      name: 'Butter chicken-style tofu bowl',
      category: 'Balanced Meals',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-green-50 via-white to-brand-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-brand-green-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-brand-green-50 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-brand-green-600" />
              </button>
              <h1 className="logo-text text-brand-green-500">DIETBRO</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-brand-green-500 font-semibold text-sm">Menu</a>
              <button 
                onClick={onPlansClick}
                className="text-gray-600 hover:text-brand-green-500 transition-colors font-medium text-sm"
              >
                Plans
              </button>
              <button 
                onClick={onLocationsClick}
                className="text-gray-600 hover:text-brand-green-500 transition-colors font-medium text-sm"
              >
                Location's
              </button>
              <button 
                onClick={onFAQClick}
                className="text-gray-600 hover:text-brand-green-500 transition-colors font-medium text-sm"
              >
                FAQ
              </button>
              <a href="#" className="text-gray-600 hover:text-brand-green-500 transition-colors font-medium text-sm">Contact</a>
            </nav>
            <button 
              onClick={onGetStarted}
              className="bg-brand-green-500 text-white px-4 py-2 rounded-xl hover:bg-brand-green-600 transition-colors font-semibold text-sm shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-green-600 mb-4 tracking-tight gagalin-heading">
              Our Top Picks
            </h1>
            <p className="text-lg text-gray-600 font-light mb-2">
              What you see is what you get - Healthy, Chef - Crafted Meals
            </p>
            <p className="text-lg text-gray-600 font-light">
              Delivered Fresh to your door
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-brand-green-100/50 flex gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all text-sm ${
                    selectedCategory === category.name
                      ? 'bg-brand-green-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-brand-green-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Meal Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {mealItems.map((meal) => (
              <div key={meal.id} className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-green-100/50 group transform hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={meal.image} 
                    alt={meal.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-brand-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    {meal.category}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 leading-tight">
                    {meal.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-green-100/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 gagalin-heading">
                Want help building your perfect plan?
              </h2>
              <button 
                onClick={onGetStarted}
                className="bg-brand-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get a free call from our nutrition coach
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPopup;