import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onGetStarted?: () => void;
  onOrdersClick?: () => void;
  onMenuClick?: () => void;
  onLocationsClick?: () => void;
  onPlansClick?: () => void;
  onBlogsClick?: () => void;
  onLogoClick?: () => void; // Added for logo click consistency if needed
  onFAQClick?: () => void; // Added as it's a common header link
}

// onOrdersClick and onBlogsClick are commented out for now
const Header: React.FC<HeaderProps> = ({ onGetStarted, /*onOrdersClick,*/ onMenuClick, onLocationsClick, onPlansClick, /*onBlogsClick,*/ onLogoClick, onFAQClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-brand-green-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* Using font-oswald for logo consistency */}
            <button
              onClick={onLogoClick}
              className="text-2xl font-black italic text-brand-green-500 interactive hover:scale-105 transition-transform font-oswald" // Added italic
            >
              DIETBRO
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={onMenuClick}
              className="text-gray-600 hover:text-brand-green-500 transition-colors font-medium text-sm"
            >
              Menu
            </button>
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
              Locations
            </button>
            <button
              onClick={onFAQClick}
              className="text-gray-600 hover:text-brand-green-500 transition-colors font-medium text-sm"
            >
              FAQ
            </button>
          </nav>

          {/* Get Started Button */}
          <div className="hidden md:block">
            <button
              onClick={onGetStarted}
              className="btn-primary bg-gradient-brand text-white px-6 py-2.5 rounded-xl hover:bg-brand-green-600 transition-all font-semibold text-sm shadow-glow hover:shadow-glow-lg transform hover:-translate-y-1 hover:scale-105 interactive"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-brand-green-500 transition-all hover:scale-110 interactive"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-brand-green-100/50 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              <button
                onClick={onMenuClick}
                className="text-gray-700 hover:text-brand-green-500 transition-all font-medium text-left hover:scale-105 interactive focus-ring"
              >
                Menu
              </button>
              <button
                onClick={onPlansClick}
                className="text-gray-700 hover:text-brand-green-500 transition-all font-medium text-left hover:scale-105 interactive focus-ring"
              >
                Plans
              </button>
              <button
                onClick={onLocationsClick}
                className="text-gray-700 hover:text-brand-green-500 transition-all font-medium text-left hover:scale-105 interactive focus-ring"
              >
                Location's
              </button>
              {/*
              <button
                onClick={onOrdersClick}
                className="text-gray-700 hover:text-brand-green-500 transition-all font-medium text-left hover:scale-105 interactive focus-ring"
              >
                Orders
              </button>
              <button
                onClick={onBlogsClick}
                className="text-gray-700 hover:text-brand-green-500 transition-all font-medium text-left hover:scale-105 interactive focus-ring"
              >
                Blogs
              </button>
              */}
              {/* Added FAQ button to mobile nav */}
              <button
                onClick={onFAQClick}
                className="text-gray-700 hover:text-brand-green-500 transition-all font-medium text-left hover:scale-105 interactive focus-ring"
              >
                FAQ
              </button>
              <button
                onClick={onGetStarted}
                className="btn-primary bg-gradient-brand text-white px-6 py-2.5 rounded-xl hover:bg-brand-green-600 transition-all font-semibold w-fit text-sm shadow-glow hover:shadow-glow-lg transform hover:-translate-y-1 hover:scale-105 interactive"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
