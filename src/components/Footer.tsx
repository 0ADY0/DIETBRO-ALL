import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onGetStarted?: () => void;
  onFAQClick?: () => void;
  onMenuClick?: () => void;
  onPlansClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onGetStarted, onFAQClick, onMenuClick, onPlansClick }) => {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="logo-text text-brand-green-400">DIETBRO</h3>
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
              <li><a href="#" className="text-gray-300 hover:text-brand-green-400 transition-colors font-light">How it Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-green-400 transition-colors font-light">About Us</a></li>
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