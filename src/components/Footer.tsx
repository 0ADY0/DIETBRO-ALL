import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onGetStarted?: () => void;
  onOrdersClick?: () => void;
  onMenuClick?: () => void;
  onPlansClick?: () => void;
  onBlogsClick?: () => void;
  onFAQClick?: () => void;
  onLogoClick?: () => void; // Added for logo click consistency if needed
}

// onOrdersClick and onBlogsClick are commented out for now
const Footer: React.FC<FooterProps> = ({ onGetStarted, /*onOrdersClick,*/ onMenuClick, onPlansClick, /*onBlogsClick,*/ onFAQClick, onLogoClick }) => {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            {/* Using font-oswald for logo consistency */}
            <h3 
              className="text-2xl font-black italic text-brand-green-400 font-oswald cursor-pointer"
              onClick={onLogoClick || onGetStarted} // Assuming logo click might go to home or get started
            >
              DIETBRO
            </h3>
            <p className="text-gray-300 leading-relaxed font-light">
              Delivering fresh, nutritious, and delicious meals to fuel your fitness journey across Bangalore.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-brand-green-400 cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-brand-green-400 cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-brand-green-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={onMenuClick}
                  className="text-gray-300 hover:text-brand-green-400 transition-colors font-light text-left"
                >
                  Menu
                </button>
              </li>
              <li>
                <button 
                  onClick={onPlansClick}
                  className="text-gray-300 hover:text-brand-green-400 transition-colors font-light text-left"
                >
                  Plans
                </button>
              </li>
              {/* Assuming these are internal navigation, changed to buttons with handlers */}
              <li>
                <button
                  onClick={onGetStarted} // Assuming "How it Works" might lead to Get Started form
                  className="text-gray-300 hover:text-brand-green-400 transition-colors font-light text-left"
                >
                  How it Works
                </button>
              </li>
              <li>
                {/* Placeholder for About Us, if it's a separate page */}
                <a href="#" className="text-gray-300 hover:text-brand-green-400 transition-colors font-light">About Us</a>
              </li>
              {/*
              <li>
                <button 
                  onClick={onBlogsClick}
                  className="text-gray-300 hover:text-brand-green-400 transition-colors font-light text-left"
                >
                  Blogs
                </button>
              </li>
              */}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={onFAQClick}
                  className="text-gray-300 hover:text-brand-green-400 transition-colors font-light text-left"
                >
                  FAQ
                </button>
              </li>
              <li><a href="#" className="text-gray-300 hover:text-brand-green-400 transition-colors font-light">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-green-400 transition-colors font-light">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-green-400 transition-colors font-light">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-green-400 transition-colors font-light">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-green-400 transition-colors font-light">Refund Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-green-400" />
                <span className="text-gray-300 font-light">+91 767602267</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-green-400" />
                <span className="text-gray-300 font-light">hello@dietbro.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-green-400" />
                <span className="text-gray-300 font-light">Bangalore, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 font-light">
            © 2024 Dietbro. All rights reserved. Made with ❤️ for healthy living.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
