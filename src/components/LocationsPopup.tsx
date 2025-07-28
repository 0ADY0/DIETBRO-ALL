import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, MapPin } from 'lucide-react';

interface LocationsPopupProps {
  onBack: () => void;
  onGetStarted: () => void;
  onOrdersClick: () => void;
  onMenuClick: () => void;
  onPlansClick?: () => void;
  onBlogsClick?: () => void; // Keeping this prop as it's used in the header navigation
  onFAQClick?: () => void; // Keeping this prop as it's used in the header navigation
}

// onOrdersClick and onBlogsClick are commented out for now
const LocationsPopup: React.FC<LocationsPopupProps> = ({ onBack, onGetStarted, /*onOrdersClick,*/ onMenuClick, onPlansClick, /*onBlogsClick,*/ onFAQClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<typeof locations>([]); // State for filtered locations

  const locations = [
    {
      name: 'Koramangala',
      description: 'Best Subscription Zones',
      meals: '50+',
      color: 'bg-brand-green-500',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.272443165904!2d77.63219245!3d12.93545675!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144ed898fc2d%3A0x1681f38e8c00ae56!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1752770949048!5m2!1sen!2sin'
    },
    {
      name: 'HSR Layout',
      description: 'Top Performing Zone',
      meals: '65+',
      color: 'bg-brand-green-500',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15553.86435345758!2d77.63855735!3d12.9404285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1397b9136113%3A0x861313312c96c41d!2sHSR%20Layout%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1752771000000!5m2!1sen!2sin'
    },
    {
      name: 'MG Road',
      description: 'Lunch Hour Favourite',
      meals: '37+',
      color: 'bg-brand-green-500',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15551.49390299839!2d77.59972335!3d12.97541175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167d64b1845f%3A0x1c8b3e8e1f0e2b4f!2sMahatma%20Gandhi%20Rd%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1752771050000!5m2!1sen!2sin'
    },
    {
      name: 'Indiranagar',
      description: 'Trendy Food Zone',
      meals: '45+',
      color: 'bg-brand-green-500',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15551.644342566734!2d77.63110295!3d12.97341175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13d4b1a23333%3A0x1d2e1b1d2e1b1d2e!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1752771100000!5m2!1sen!2sin'
    },
    {
      name: 'Whitefield',
      description: 'Tech Hub Deliveries',
      meals: '70+',
      color: 'bg-brand-green-500',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15550.000000000000!2d77.74999995!3d12.96999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae139999999999%3A0x1d2e1b1d2e1b1d2e!2sWhitefield%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1752771150000!5m2!1sen!2sin'
    }
  ];

  // Effect to filter locations based on search query
  useEffect(() => {
    if (searchQuery) {
      setFilteredLocations(
        locations.filter(location =>
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredLocations(locations); // Show all locations if search query is empty
    }
  }, [searchQuery]); // Re-run when searchQuery changes

  // Determine the map embed URL based on search result or default to Koramangala
  const displayedMapEmbed = filteredLocations.length > 0
    ? filteredLocations[0].mapEmbed // Show map of the first filtered location
    : locations[0].mapEmbed; // Default to Koramangala if no search or no results


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
              {/* Changed to h1 for semantic correctness and onClick for navigation */}
              <button
                onClick={onBack}
                className="text-2xl font-black italic text-brand-green-500 interactive hover:scale-105 transition-transform font-oswald"
                style={{ outline: 'none', border: 'none', background: 'none', padding: 0, margin: 0 }}
              >
                DIETBRO
              </button>
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
              <button
                onClick={onPlansClick}
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
                    placeholder="Search your location..." 
                    className="w-full px-4 py-3 pl-12 rounded-2xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all bg-white/70 backdrop-blur-sm"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                {/* Map Container */}
                <div className="rounded-2xl overflow-hidden border-4 border-brand-green-200 shadow-lg">
                  <iframe
                    src={displayedMapEmbed} // Dynamic map embed URL
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Dietbro Delivery Area Map"
                  />
                </div>

                {/* Display Filtered Locations */}
                {searchQuery && filteredLocations.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Matching Locations:</h3>
                    {filteredLocations.map((location, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl border border-gray-200">
                        <MapPin className="w-5 h-5 text-brand-green-500" />
                        <div>
                          <p className="font-medium text-gray-800">{location.name}</p>
                          <p className="text-sm text-gray-600">{location.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {searchQuery && filteredLocations.length === 0 && (
                  <p className="mt-6 text-center text-gray-600">No matching locations found. Try a different search.</p>
                )}
              </div>
            </div>
          </div>

          {/* Removed Statistics Section and MealCounter */}
          {/* <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-green-600 mb-12 tracking-tight gagalin-heading">
              Live Meal Counter - Where Our Meals are Loved
            </h2>
            
            {statsLoading && <p className="text-gray-600">Loading stats...</p>}
            {statsError && <p className="text-red-500">Error loading stats: {statsError}</p>}
            {!statsLoading && !statsError && (
              <div className="grid md:grid-cols-3 gap-8">
                <MealCounter
                  totalUsers={backendStats.totalUsers}
                  vegUsers={backendStats.vegUsers}
                  nonVegUsers={backendStats.nonVegUsers}
                  lunchUsers={backendStats.lunchUsers}
                  dinnerUsers={backendStats.dinnerUsers}
                  bothMealsUsers={backendStats.bothMealsUsers}
                  activeSubscriptions={backendStats.activeSubscriptions}
                  pendingSubscriptions={backendStats.pendingSubscriptions}
                />
              </div>
            )}
          </div> */}

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-green-100/50">
              <h3 className="text-2xl font-black text-gray-900 mb-4 metropolis-bold text-shadow">
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
