import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, X, Star, Clock, Flame, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface MenuPopupProps {
  onBack: () => void;
  onGetStarted: () => void;
  onOrdersClick: () => void;
  onPlansClick?: () => void;
  onLocationsClick?: () => void;
  onBlogsClick?: () => void;
  onFAQClick?: () => void; // Added for header consistency
  onMenuClick?: () => void; // Added for header consistency
  onLogoClick?: () => void; // Added for header consistency
}

interface MealItem {
  id: number;
  name: string;
  category: string;
  image: string;
  rating: number;
  calories: number;
  protein: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  description: string;
  nutritionFacts: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    sodium: string;
  };
  allergens: string[];
}

// onOrdersClick and onBlogsClick are commented out for now
const MenuPopup: React.FC<MenuPopupProps> = ({ onBack, onGetStarted, /*onOrdersClick,*/ onPlansClick, onLocationsClick, /*onBlogsClick,*/ onFAQClick, onMenuClick, onLogoClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('Signature Meals');
  const [selectedMeal, setSelectedMeal] = useState<MealItem | null>(null);
  const [showMealPopup, setShowMealPopup] = useState(false);

  const categories = [
    { id: 'signature', name: 'Signature Meals', active: true },
    { id: 'high-protein', name: 'High Protein', active: true },
    { id: 'balanced', name: 'Balanced Meals', active: true }
  ];

  const mealItems: MealItem[] = [
    {
      id: 1,
      name: 'Butter Chicken Bowl',
      category: 'Signature Meals',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      rating: 4.8,
      calories: 520,
      protein: '35g',
      cookTime: '25 mins',
      servings: 1,
      ingredients: ['Chicken breast', 'Basmati rice', 'Tomato sauce', 'Heavy cream', 'Onions', 'Garlic', 'Ginger', 'Garam masala', 'Turmeric', 'Cilantro'],
      description: 'Tender chicken in a rich, creamy tomato-based sauce served over fragrant basmati rice. A classic Indian comfort food reimagined for your health goals.',
      nutritionFacts: {
        calories: 520,
        protein: '35g',
        carbs: '45g',
        fat: '22g',
        fiber: '4g',
        sodium: '890mg'
      },
      allergens: ['Dairy', 'Gluten']
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      category: 'High Protein',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      rating: 4.9,
      calories: 380,
      protein: '42g',
      cookTime: '15 mins',
      servings: 1,
      ingredients: ['Grilled chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Red onion', 'Avocado', 'Feta cheese', 'Olive oil', 'Lemon', 'Herbs'],
      description: 'Fresh mixed greens topped with perfectly grilled chicken breast, seasonal vegetables, and a light herb vinaigrette.',
      nutritionFacts: {
        calories: 380,
        protein: '42g',
        carbs: '12g',
        fat: '18g',
        fiber: '8g',
        sodium: '650mg'
      },
      allergens: ['Dairy']
    },
    {
      id: 3,
      name: 'Quinoa Power Bowl',
      category: 'Balanced Meals',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      rating: 4.7,
      calories: 450,
      protein: '24g',
      cookTime: '20 mins',
      servings: 1,
      ingredients: ['Quinoa', 'Roasted sweet potato', 'Black beans', 'Corn', 'Bell peppers', 'Spinach', 'Avocado', 'Pumpkin seeds', 'Lime', 'Tahini dressing'],
      description: 'Nutrient-dense quinoa bowl packed with colorful vegetables, plant-based protein, and a creamy tahini dressing.',
      nutritionFacts: {
        calories: 450,
        protein: '24g',
        carbs: '58g',
        fat: '16g',
        fiber: '12g',
        sodium: '420mg'
      },
      allergens: ['Sesame']
    },
    {
      id: 4,
      name: 'Paneer Tikka Masala',
      category: 'Signature Meals',
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      rating: 4.6,
      calories: 480,
      protein: '28g',
      cookTime: '30 mins',
      servings: 1,
      ingredients: ['Paneer', 'Basmati rice', 'Tomato sauce', 'Cream', 'Onions', 'Bell peppers', 'Spices', 'Cilantro', 'Naan bread'],
      description: 'Marinated paneer cubes in a rich, spiced tomato gravy served with aromatic basmati rice.',
      nutritionFacts: {
        calories: 480,
        protein: '28g',
        carbs: '42g',
        fat: '24g',
        fiber: '5g',
        sodium: '780mg'
      },
      allergens: ['Dairy', 'Gluten']
    },
    {
      id: 5,
      name: 'Salmon Teriyaki Bowl',
      category: 'High Protein',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      rating: 4.9,
      calories: 510,
      protein: '38g',
      cookTime: '18 mins',
      servings: 1,
      ingredients: ['Salmon fillet', 'Brown rice', 'Broccoli', 'Carrots', 'Edamame', 'Teriyaki sauce', 'Sesame seeds', 'Scallions'],
      description: 'Glazed salmon fillet with steamed vegetables over brown rice, finished with sesame seeds.',
      nutritionFacts: {
        calories: 510,
        protein: '38g',
        carbs: '35g',
        fat: '22g',
        fiber: '6g',
        sodium: '920mg'
      },
      allergens: ['Fish', 'Soy', 'Sesame']
    },
    {
      id: 6,
      name: 'Mediterranean Bowl',
      category: 'Balanced Meals',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      rating: 4.5,
      calories: 420,
      protein: '22g',
      cookTime: '15 mins',
      servings: 1,
      ingredients: ['Chickpeas', 'Couscous', 'Cucumber', 'Tomatoes', 'Olives', 'Feta cheese', 'Red onion', 'Olive oil', 'Lemon', 'Herbs'],
      description: 'Fresh Mediterranean flavors with chickpeas, vegetables, and feta cheese over fluffy couscous.',
      nutritionFacts: {
        calories: 420,
        protein: '22g',
        carbs: '48g',
        fat: '16g',
        fiber: '10g',
        sodium: '680mg'
      },
      allergens: ['Dairy', 'Gluten']
    }
  ];

  const filteredMeals = mealItems.filter(meal =>
    selectedCategory === 'Signature Meals' ? meal.category === 'Signature Meals' :
    selectedCategory === 'High Protein' ? meal.category === 'High Protein' :
    selectedCategory === 'Balanced Meals' ? meal.category === 'Balanced Meals' :
    true
  );

  const handleMealClick = (meal: MealItem) => {
    setSelectedMeal(meal);
    setShowMealPopup(true);
  };

  const closeMealPopup = () => {
    setShowMealPopup(false);
    setSelectedMeal(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-brand-green-50 via-white to-brand-green-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-brand-green-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-brand-green-50 rounded-xl transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-brand-green-600" />
                </button>
                {/* Using font-oswald for logo consistency */}
                <button
                  onClick={onLogoClick || onBack}
                  className="text-2xl font-black italic text-brand-green-500 interactive hover:scale-105 transition-transform font-heading"
                  style={{ outline: 'none', border: 'none', background: 'none', padding: 0, margin: 0 }}
                >
                  DIETBRO
                </button>
              </div>
              <nav className="hidden md:flex flex-1 justify-center space-x-8">
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
              <div className="hidden md:block ml-4">
                <button
                  onClick={onGetStarted}
                  className="bg-brand-green-500 text-white px-6 py-2.5 rounded-xl hover:bg-brand-green-600 transition-all font-semibold text-sm shadow-glow hover:shadow-glow-lg transform hover:-translate-y-1 hover:scale-105 interactive"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-12">
              {/* Using font-oswald for heading consistency */}
              <h1 className="text-4xl lg:text-5xl font-bold text-brand-green-600 mb-4 tracking-tight font-heading">
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

            {/* Mortal Kombat Style Meal Carousel */}
            <MealCarousel 
              meals={filteredMeals}
              onMealSelect={handleMealClick}
              onGetStarted={onGetStarted}
            />

            {/* Bottom Section */}
            <div className="text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-green-100/50">
                {/* Using font-oswald for heading consistency */}
                <h2 className="text-2xl font-black text-gray-900 mb-4 font-heading text-shadow">
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

      {/* Meal Details Popup */}
      {showMealPopup && selectedMeal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-4xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-yellow-700">{selectedMeal.rating}</span>
                </div>
                <div className="flex items-center gap-1 bg-brand-green-100 px-3 py-1 rounded-full">
                  <Flame className="w-4 h-4 text-brand-green-600" />
                  <span className="text-sm font-medium">{selectedMeal.calories} cal</span>
                </div>
              </div>
              <button
                onClick={closeMealPopup}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Side - Image and Basic Info */}
                <div>
                  <img
                    src={selectedMeal.image}
                    alt={selectedMeal.name}
                    className="w-full h-64 object-cover rounded-2xl mb-6"
                  />
                  
                  {/* Using font-oswald for meal name consistency */}
                  <h1 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
                    {selectedMeal.name}
                  </h1>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {selectedMeal.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <Clock className="w-5 h-5 text-brand-green-600 mx-auto mb-1" />
                      <p className="text-sm font-medium text-gray-900">{selectedMeal.cookTime}</p>
                      <p className="text-xs text-gray-500">Cook Time</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <Users className="w-5 h-5 text-brand-green-600 mx-auto mb-1" />
                      <p className="text-sm font-medium text-gray-900">{selectedMeal.servings}</p>
                      <p className="text-xs text-gray-500">Serving</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <Flame className="w-5 h-5 text-brand-green-600 mx-auto mb-1" />
                      <p className="text-sm font-medium text-gray-900">{selectedMeal.protein}</p>
                      <p className="text-xs text-gray-500">Protein</p>
                    </div>
                  </div>
                </div>

                {/* Right Side - Detailed Info */}
                <div className="space-y-6">
                  {/* Nutrition Facts */}
                  <div className="bg-gradient-to-br from-brand-green-50 to-brand-green-100 rounded-2xl p-6">
                    {/* Using font-oswald for heading consistency */}
                    <h3 className="text-xl font-bold text-brand-green-800 mb-4 font-heading">
                      Nutrition Facts
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-brand-green-700">{selectedMeal.nutritionFacts.calories}</p>
                        <p className="text-sm text-brand-green-600">Calories</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-brand-green-700">{selectedMeal.nutritionFacts.protein}</p>
                        <p className="text-sm text-brand-green-600">Protein</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-brand-green-700">{selectedMeal.nutritionFacts.carbs}</p>
                        <p className="text-sm text-brand-green-600">Carbs</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-brand-green-700">{selectedMeal.nutritionFacts.fat}</p>
                        <p className="text-sm text-brand-green-600">Fat</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-brand-green-700">{selectedMeal.nutritionFacts.fiber}</p>
                        <p className="text-sm text-brand-green-600">Fiber</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-brand-green-700">{selectedMeal.nutritionFacts.sodium}</p>
                        <p className="text-sm text-brand-green-600">Sodium</p>
                      </div>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div>
                    {/* Using font-oswald for heading consistency */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">
                      Ingredients
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMeal.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Allergens */}
                  <div>
                    {/* Using font-oswald for heading consistency */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">
                      Allergen Information
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMeal.allergens.map((allergen, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                        >
                          Contains {allergen}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={onGetStarted}
                    className="w-full bg-brand-green-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-brand-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
                  >
                    Add to My Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// New MealCarousel component
interface MealCarouselProps {
  meals: MealItem[];
  onMealSelect: (meal: MealItem) => void;
  onGetStarted: () => void;
}

const MealCarousel: React.FC<MealCarouselProps> = ({ meals, onMealSelect, onGetStarted }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : meals.length - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setSelectedIndex(prev => prev < meals.length - 1 ? prev + 1 : 0);
          break;
        case 'Enter':
          e.preventDefault();
          onMealSelect(meals[selectedIndex]);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, meals, onMealSelect]);

  // Auto-scroll to selected thumbnail
  useEffect(() => {
    if (thumbnailRefs.current[selectedIndex]) {
      thumbnailRefs.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedIndex]);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleThumbnailHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleThumbnailLeave = () => {
    setHoveredIndex(null);
  };

  const navigateLeft = () => {
    setSelectedIndex(prev => prev > 0 ? prev - 1 : meals.length - 1);
  };

  const navigateRight = () => {
    setSelectedIndex(prev => prev < meals.length - 1 ? prev + 1 : 0);
  };

  const currentMeal = meals[selectedIndex];
  const displayMeal = hoveredIndex !== null ? meals[hoveredIndex] : currentMeal;

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Large Preview Section */}
      <div className="relative mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-brand-green-100/50 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
            <div className="relative">
              <img
                src={displayMeal.image}
                alt={displayMeal.name}
                className="w-full h-80 object-cover rounded-2xl shadow-lg transition-all duration-500"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="bg-yellow-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-yellow-700">{displayMeal.rating}</span>
                </div>
                <div className="bg-brand-green-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <Flame className="w-4 h-4 text-brand-green-600" />
                  <span className="text-sm font-medium">{displayMeal.calories} cal</span>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 font-heading">
                  {displayMeal.name}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {displayMeal.description}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-brand-green-50 to-brand-green-100 rounded-xl">
                  <Clock className="w-6 h-6 text-brand-green-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-brand-green-700">{displayMeal.cookTime}</p>
                  <p className="text-sm text-brand-green-600">Cook Time</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-brand-green-50 to-brand-green-100 rounded-xl">
                  <Users className="w-6 h-6 text-brand-green-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-brand-green-700">{displayMeal.servings}</p>
                  <p className="text-sm text-brand-green-600">Serving</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-brand-green-50 to-brand-green-100 rounded-xl">
                  <Flame className="w-6 h-6 text-brand-green-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-brand-green-700">{displayMeal.protein}</p>
                  <p className="text-sm text-brand-green-600">Protein</p>
                </div>
              </div>

              {/* Key Ingredients */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 font-heading">Key Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {displayMeal.ingredients.slice(0, 6).map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {ingredient}
                    </span>
                  ))}
                  {displayMeal.ingredients.length > 6 && (
                    <span className="px-3 py-1 bg-brand-green-100 text-brand-green-700 rounded-full text-sm font-medium">
                      +{displayMeal.ingredients.length - 6} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onMealSelect(displayMeal)}
                className="w-full bg-brand-green-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-brand-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
              >
                Select This Meal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Carousel */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={navigateLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-brand-green-100/50 hover:bg-brand-green-50"
        >
          <ChevronLeft className="w-6 h-6 text-brand-green-600" />
        </button>
        
        <button
          onClick={navigateRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-brand-green-100/50 hover:bg-brand-green-50"
        >
          <ChevronRight className="w-6 h-6 text-brand-green-600" />
        </button>

        {/* Thumbnail Container */}
        <div 
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {meals.map((meal, index) => (
            <div
              key={meal.id}
              ref={el => thumbnailRefs.current[index] = el}
              onClick={() => handleThumbnailClick(index)}
              onMouseEnter={() => handleThumbnailHover(index)}
              onMouseLeave={handleThumbnailLeave}
              className={`
                relative flex-shrink-0 cursor-pointer transition-all duration-300 transform
                ${selectedIndex === index 
                  ? 'scale-110 z-20' 
                  : hoveredIndex === index 
                    ? 'scale-105 z-10' 
                    : 'scale-100'
                }
              `}
            >
              {/* Thumbnail Image */}
              <div className={`
                relative w-24 h-24 rounded-2xl overflow-hidden border-4 transition-all duration-300
                ${selectedIndex === index
                  ? 'border-brand-green-500 shadow-2xl shadow-brand-green-500/50'
                  : hoveredIndex === index
                    ? 'border-brand-green-300 shadow-lg'
                    : 'border-transparent shadow-md'
                }
              `}>
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Selection Indicator */}
                {selectedIndex === index && (
                  <div className="absolute inset-0 bg-brand-green-500/20 flex items-center justify-center">
                    <div className="w-8 h-8 bg-brand-green-500 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Meal Name */}
              <div className="mt-2 text-center">
                <p className="text-xs font-medium text-gray-900 truncate max-w-24">
                  {meal.name}
                </p>
                <p className="text-xs text-gray-500">
                  {meal.calories} cal
                </p>
              </div>

              {/* Glow Effect for Selected */}
              {selectedIndex === index && (
                <div className="absolute inset-0 rounded-2xl bg-brand-green-500/20 blur-xl -z-10 animate-pulse"></div>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Use arrow keys or click to navigate • Press Enter to select • Hover for preview
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuPopup;
