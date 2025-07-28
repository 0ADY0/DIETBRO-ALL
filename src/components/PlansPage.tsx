import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface PlansPageProps {
  onBack: () => void;
  onGetStarted: () => void;
  onOrdersClick: () => void; // New prop
  onMenuClick: () => void;
  onLocationsClick: () => void;
  onBlogsClick?: () => void; // New prop
  onFAQClick: () => void; // Ensure this is present if used in header
}

// Pricing data from your Pricing.pdf
const pricingTable = {
  Balanced: {
    3: 230,
    7: 210,
    14: 190,
    28: 170,
  },
  HighProtein: { // Key must match value in selectedPreferences.dietType
    3: 280,
    7: 270,
    14: 260,
    28: 250,
  },
};

// Function to calculate total price based on your formula
const calculateTotalPrice = ({ dietType, days, mealsPerDay }: { dietType: 'Balanced' | 'HighProtein', days: 3 | 7 | 14 | 28, mealsPerDay: number }): number => {
  const pricePerMeal = pricingTable[dietType][days];
  return pricePerMeal * mealsPerDay * days;
};

// onOrdersClick and onBlogsClick are commented out for now
const PlansPage: React.FC<PlansPageProps> = ({ onBack, onGetStarted, /*onOrdersClick,*/ onMenuClick, onLocationsClick, /*onBlogsClick,*/ onFAQClick }) => {
  const [currentMealSlide, setCurrentMealSlide] = useState(0);

  // State for selected preferences, ensuring types match pricingTable keys and numeric values
  const [selectedPreferences, setSelectedPreferences] = useState({
    mealPreference: 'Lunch', // 'Lunch', 'Dinner', 'Both'
    mealType: 'Veg', // 'Veg', 'Non-Veg'
    dietType: 'HighProtein' as 'HighProtein' | 'Balanced', // Must be 'HighProtein' or 'Balanced'
    numberOfDays: 3 as 3 | 7 | 14 | 28 // Must be 3, 7, 14, or 28 (numbers)
  });
  const [totalPrice, setTotalPrice] = useState(0);

  // Features that were common to both plans, now to be displayed in the consolidated section
  const commonFeatures = [
    'Unlimited Carry Forward',
    'Dedicated Support',
    'Macro Counted',
    'Free Delivery'
  ];

  // Use useEffect to calculate price whenever preferences change
  useEffect(() => {
    // Determine meals per day based on mealPreference
    const mealsPerDay = selectedPreferences.mealPreference === 'Both' ? 2 : 1;

    // Determine non-veg surcharge (₹20 per meal per day)
    const nonVegSurchargePerMealPerDay = selectedPreferences.mealType === 'Non-Veg' ? 20 : 0;

    const currentDietType = selectedPreferences.dietType;
    const currentDays = selectedPreferences.numberOfDays;

    if (pricingTable[currentDietType] && pricingTable[currentDietType][currentDays]) {
      const calculatedBasePrice = calculateTotalPrice({
        dietType: currentDietType,
        days: currentDays,
        mealsPerDay: mealsPerDay
      });
      // Add non-veg surcharge: surcharge per meal per day * number of days * meals per day
      const finalCalculatedPrice = calculatedBasePrice + (nonVegSurchargePerMealPerDay * currentDays * mealsPerDay);

      setTotalPrice(finalCalculatedPrice);
    } else {
      setTotalPrice(0); // Fallback for invalid selections
    }
  }, [selectedPreferences]); // Recalculate when selectedPreferences change

  // Handler for preference changes, casting value to number for numberOfDays
  const handlePreferenceChange = (category: string, value: string | number) => {
    setSelectedPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  // Options for meal preferences, meal types, diet types, and number of days
  const mealPreferencesOptions = ['Lunch', 'Dinner', 'Both']; // Added 'Both'
  const mealTypesOptions = ['Veg', 'Non-Veg']; // Removed 'Egg'
  const dietTypesOptions = ['HighProtein', 'Balanced']; // Use 'HighProtein' to match pricingTable key
  const numberOfDaysOptions = [3, 7, 14, 28]; // Use numbers directly for calculation

  // Top Seller Meals Data (from your provided code)
  const topSellerMeals = [
    {
      id: 1,
      name: 'Butter Chicken Bowl',
      description: 'Creamy butter chicken with basmati rice',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.8,
      price: '₹199',
      calories: '520 cal',
      protein: '35g protein'
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      description: 'Fresh greens with grilled chicken breast',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.9,
      price: '₹179',
      calories: '380 cal',
      protein: '42g protein'
    },
    {
      id: 3,
      name: 'Paneer Tikka Masala',
      description: 'Spiced paneer in rich tomato gravy',
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.7,
      price: '₹189',
      calories: '450 cal',
      protein: '28g protein'
    },
    {
      id: 4,
      name: 'Salmon Teriyaki Bowl',
      description: 'Glazed salmon with steamed vegetables',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.9,
      price: '₹249',
      calories: '480 cal',
      protein: '38g protein'
    },
    {
      id: 5,
      name: 'Quinoa Power Bowl',
      description: 'Superfood quinoa with mixed vegetables',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.6,
      price: '₹169',
      calories: '420 cal',
      protein: '24g protein'
    }
  ];

  // Slider navigation functions
  const nextMealSlide = () => {
    setCurrentMealSlide((prev) => (prev + 1) % topSellerMeals.length);
  };

  const prevMealSlide = () => {
    setCurrentMealSlide((prev) => (prev - 1 + topSellerMeals.length) % topSellerMeals.length);
  };

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
                className="text-2xl font-black italic text-brand-green-500 interactive hover:scale-105 transition-transform font-heading"
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
                onClick={() => {}}
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
            {/* Left Side - Top Seller Meals Slider and Preferences */}
            <div className="space-y-8">
              {/* Top Seller Meals Slider */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-brand-green-100/50">
                <h3 className="text-2xl font-bold text-brand-green-600 mb-6 text-center gagalin-heading">
                  🔥 Top Seller Meals
                </h3>
                
                <div className="relative">
                  {/* Slider Container */}
                  <div className="overflow-hidden rounded-2xl">
                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentMealSlide * 100}%)` }}
                    >
                      {topSellerMeals.map((meal) => (
                        <div key={meal.id} className="w-full flex-shrink-0">
                          <div className="relative">
                            <img
                              src={meal.image}
                              alt={meal.name}
                              className="w-full h-64 object-cover rounded-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
                            
                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm font-medium">{meal.rating}</span>
                                </div>
                                <span className="text-sm bg-brand-green-500 px-2 py-1 rounded-full">
                                  {meal.price}
                                </span>
                              </div>
                              <h4 className="text-xl font-bold mb-1">{meal.name}</h4>
                              <p className="text-sm text-gray-200 mb-2">{meal.description}</p>
                              <div className="flex gap-4 text-xs">
                                <span className="bg-white/20 px-2 py-1 rounded">{meal.calories}</span>
                                <span className="bg-white/20 px-2 py-1 rounded">{meal.protein}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevMealSlide}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-brand-green-600 p-2 rounded-full transition-all hover:scale-110 shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextMealSlide}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-brand-green-600 p-2 rounded-full transition-all hover:scale-110 shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-brand h-2 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${((currentMealSlide + 1) / topSellerMeals.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Preferences Panel */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-brand-green-100/50">
                <div className="space-y-6">
                  {/* Meal Preferences (Lunch/Dinner/Both) */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Meal Preferences</h3>
                    <div className="flex gap-2">
                      {mealPreferencesOptions.map((pref) => (
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

                  {/* Meal Type (Veg/Non-Veg) */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Meal Type</h3>
                    <div className="flex gap-2">
                      {mealTypesOptions.map((type) => (
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

                  {/* Diet Type (High Protein/Balanced) */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Diet Type</h3>
                    <div className="flex gap-2">
                      {dietTypesOptions.map((diet) => (
                        <button
                          key={diet}
                          onClick={() => handlePreferenceChange('dietType', diet as 'HighProtein' | 'Balanced')}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            selectedPreferences.dietType === diet
                              ? 'bg-brand-green-500 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-600 hover:bg-brand-green-50'
                          }`}
                        >
                          {diet === 'HighProtein' ? 'High Protein' : diet} {/* Display 'High Protein' with space */}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Number of Days (3/7/14/28) */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Number of Days</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {numberOfDaysOptions.map((days) => (
                        <button
                          key={days}
                          onClick={() => handlePreferenceChange('numberOfDays', days)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            selectedPreferences.numberOfDays === days
                              ? 'bg-brand-green-500 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-600 hover:bg-brand-green-50'
                          }`}
                        >
                          {days} Days
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Consolidated Plan and Total Price */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-brand-green-100/50 text-brand-green-600">
                <h3 className="text-xl font-bold mb-2 text-center gagalin-heading text-brand-green-600">Your Estimated Plan Price:</h3>
                <span className="text-5xl font-extrabold gagalin-heading block text-center mb-4 text-brand-green-600">
                  ₹{totalPrice.toLocaleString()} {/* Format price with commas */}
                </span>
                <p className="text-sm mt-2 opacity-80 text-center mb-6 text-gray-600">Based on your selections above.</p>

                <div className="space-y-3 mb-8">
                  {commonFeatures.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-brand-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onGetStarted} // This button could now trigger a "Proceed to Checkout" or similar
                  className="w-full bg-brand-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Select Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
