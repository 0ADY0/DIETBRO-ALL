import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onGetStarted?: () => void;
  onFAQClick?: () => void;
  onMenuClick?: () => void;
  onLocationsClick?: () => void;
  onPlansClick?: () => void;
  onBlogsClick?: () => void;
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGetStarted, onFAQClick, onMenuClick, onLocationsClick, onPlansClick, onBlogsClick, onLogoClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-brand-green-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={onLogoClick}
              className="logo-text text-brand-green-500 interactive hover:scale-105 transition-transform"
            >
              DIETBRO
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={onMenuClick}
              className="text-gray-700 hover:text-brand-green-500 transition-all font-medium hover:scale-105 interactive focus-ring"
            >
              Menu
            </button>
            <button 
              onClick={onPlansClick}
              className="text-gray-700 hover:text-brand-green-500 transition-all font-medium hover:scale-105 interactive focus-ring"
            >
              Plans
            </button>
            <button 
              onClick={onLocationsClick}
              className="text-gray-700 hover:text-brand-green-500 transition-all font-medium hover:scale-105 interactive focus-ring"
            >
              Location's
            </button>
            <button 
              onClick={onFAQClick}
              className="text-gray-700 hover:text-brand-green-500 transition-all font-medium hover:scale-105 interactive focus-ring"
            >
              FAQ
            </button>
            <button 
              onClick={onBlogsClick}
              className="text-gray-700 hover:text-brand-green-500 transition-all font-medium hover:scale-105 interactive focus-ring"
            >
              Blogs
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
              <button 
                onClick={onFAQClick}
                className="text-gray-700 hover:text-brand-green-500 transition-all font-medium text-left hover:scale-105 interactive focus-ring"
              >
                FAQ
              </button>
              <button 
                onClick={onBlogsClick}
                className="text-gray-700 hover:text-brand-green-500 transition-all font-medium text-left hover:scale-105 interactive focus-ring"
              >
                Blogs
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