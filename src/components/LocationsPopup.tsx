import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin } from 'lucide-react';

interface LocationsPopupProps {
  onBack: () => void;
  onGetStarted: () => void;
  onFAQClick: () => void;
  onMenuClick: () => void;
  onPlansClick?: () => void;
}

const LocationsPopup: React.FC<LocationsPopupProps> = ({ onBack, onGetStarted, onFAQClick, onMenuClick, onPlansClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const locations = [
    {
      name: 'Koramangala',
      description: 'Best Subscription Zones',
      meals: '50+',
      color: 'bg-brand-green-500'
    },
    {
      name: 'HSR Layout',
      description: 'Top Performing Zone',
      meals: '65+',
      color: 'bg-brand-green-500'
    },
    {
      name: 'MG Road',
      description: 'Lunch Hour Favourite',
      meals: '37+',
      color: 'bg-brand-green-500'
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
              <a href="#" className="text-brand-green-500 font-semibold text-sm">Location's</a>
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
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-green-600 mb-6 tracking-tight gagalin-heading">
              We Deliver Where You Are
            </h1>
            <p className="text-lg text-gray-600 font-light mb-2">
              Serving healthy meals across Bangalore's busiest hubs
            </p>
            <p className="text-lg text-gray-600 font-light">
              Please reach out to us if you have any questions or want us to cover your location.
            </p>
          </div>

          {/* Map Section */}
          <div className="mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-brand-green-100/50">
              <div className="relative">
                {/* Search Bar */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-4 py-3 pl-12 rounded-2xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all bg-white/70 backdrop-blur-sm"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                {/* Map Container */}
                <div className="rounded-2xl overflow-hidden border-4 border-brand-green-200 shadow-lg">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31111.595820231585!2d77.62316310818282!3d12.910968761557404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1491bfdc6ecd%3A0xf232718439fbc879!2sHSR%20Layout%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1752258930176!5m2!1sen!2sin" 
                    width="100%" 
                    height="400" 
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="HSR Layout, Bengaluru - Dietbro Delivery Area"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-green-600 mb-12 tracking-tight gagalin-heading">
              Where Our Meals are Loved
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {locations.map((location, index) => (
                <div key={index} className="text-center">
                  <div className={`${location.color} w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2`}>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-1">
                        {location.meals}
                      </div>
                      <div className="text-sm text-white/90 font-medium">
                        Meals Everyday
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 gagalin-heading">
                    {location.name}
                  </h3>
                  <p className="text-gray-600 font-light">
                    {location.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-green-100/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 gagalin-heading">
                Start eating better today, Check your area<br />
                and explore our plans
              </h3>
              <button 
                onClick={onGetStarted}
                className="bg-brand-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                View Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPopup;