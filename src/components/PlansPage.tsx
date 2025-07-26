import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

interface PlansPageProps {
  onBack: () => void;
  onGetStarted: () => void;
  onFAQClick: () => void;
  onMenuClick: () => void;
  onLocationsClick: () => void;
}

const PlansPage: React.FC<PlansPageProps> = ({ onBack, onGetStarted, onFAQClick, onMenuClick, onLocationsClick }) => {
  const [selectedPreferences, setSelectedPreferences] = useState({
    mealPreference: 'Lunch',
    mealType: 'Veg',
    dietType: 'High Protein',
    numberOfDays: '3 Days'
  });

  const handlePreferenceChange = (category: string, value: string) => {
    setSelectedPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const mealPreferences = ['Lunch', 'Dinner'];
  const mealTypes = ['Veg', 'Non - Veg', 'Egg'];
  const dietTypes = ['High Protein', 'Balanced'];
  const numberOfDays = ['3 Days', '7 Days', '14 Days', '28 Days'];

  const plans = [
    {
      name: 'High Protein',
      price: '₹199',
      originalPrice: '₹249',
      features: [
        'Unlimited Carry Forward',
        'Dedicated Support',
        'Macro Counted',
        'Free Delivery'
      ],
      popular: true
    },
    {
      name: 'Balanced Diet',
      price: '₹189',
      originalPrice: '₹229',
      features: [
        'Unlimited Carry Forward',
        'Dedicated Support',
        'Macro Counted',
        'Free Delivery'
      ],
      popular: false
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
              <a href="#" className="text-brand-green-500 font-semibold text-sm">Plans</a>
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
              Tailored Meal Plans for Your Goals
            </h1>
            <p className="text-lg text-gray-600 font-light">
              Delivered fresh, Every day.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Meal Image and Preferences */}
            <div className="space-y-8">
              {/* Meal Image */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-brand-green-100/50">
                <div className="flex justify-center mb-6">
                  <img 
                    src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" 
                    alt="Healthy meal containers"
                    className="w-80 h-60 object-cover rounded-2xl"
                  />
                </div>
              </div>

              {/* Preferences Panel */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-brand-green-100/50">
                <div className="space-y-6">
                  {/* Meal Preferences */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Meal Preferences</h3>
                    <div className="flex gap-2">
                      {mealPreferences.map((pref) => (
                        <button
                          key={pref}
                          onClick={() => handlePreferenceChange('mealPreference', pref)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            selectedPreferences.mealPreference === pref
                              ? 'bg-brand-green-500 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-600 hover:bg-brand-green-50'
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Meal Type */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Meal Type</h3>
                    <div className="flex gap-2">
                      {mealTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => handlePreferenceChange('mealType', type)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            selectedPreferences.mealType === type
                              ? 'bg-brand-green-500 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-600 hover:bg-brand-green-50'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Diet Type */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Diet Type</h3>
                    <div className="flex gap-2">
                      {dietTypes.map((diet) => (
                        <button
                          key={diet}
                          onClick={() => handlePreferenceChange('dietType', diet)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            selectedPreferences.dietType === diet
                              ? 'bg-brand-green-500 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-600 hover:bg-brand-green-50'
                          }`}
                        >
                          {diet}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Number of Days */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Number of Days</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {numberOfDays.map((days) => (
                        <button
                          key={days}
                          onClick={() => handlePreferenceChange('numberOfDays', days)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            selectedPreferences.numberOfDays === days
                              ? 'bg-brand-green-500 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-600 hover:bg-brand-green-50'
                          }`}
                        >
                          {days}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Plans */}
            <div className="space-y-6">
              {plans.map((plan, index) => (
                <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 ${
                  plan.popular ? 'border-brand-green-500' : 'border-brand-green-100/50'
                } relative`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-brand-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 gagalin-heading">
                      {plan.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-4xl font-bold text-brand-green-600">
                        {plan.price}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {plan.originalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-brand-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={onGetStarted}
                    className="w-full bg-brand-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;