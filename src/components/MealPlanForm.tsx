    import React, { useState } from 'react';
    import { ArrowLeft, ChevronDown } from 'lucide-react'; // Removed unused ChevronLeft, ChevronRight

    interface MealPlanFormProps {
      onBack: () => void;
      onFAQClick?: () => void;
      onMenuClick?: () => void;
      onPlansClick?: () => void;
      onLocationsClick?: () => void;
      onBlogsClick?: () => void; // Added onBlogsClick prop if it's used in header/footer
    }

    // onBlogsClick is commented out for now
    const MealPlanForm: React.FC<MealPlanFormProps> = ({ onBack, onFAQClick, onMenuClick, onPlansClick, onLocationsClick /*, onBlogsClick */ }) => {
      const [currentTestimonial, setCurrentTestimonial] = useState(0);
      const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        mealPlan: '',
        preferredDays: [] as string[],
        foodPreference: '',
        dietaryPreference: [] as string[],
        allergies: '',
        password: '' // Added password field
      });
      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

      const handleInputChange = (field: string, value: string | string[]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
      };

      const handleDayToggle = (day: string) => {
        const updatedDays = formData.preferredDays.includes(day)
          ? formData.preferredDays.filter(d => d !== day)
          : [...formData.preferredDays, day];
        handleInputChange('preferredDays', updatedDays);
      };

      const handleDietaryToggle = (option: string) => {
        const updated = formData.dietaryPreference.includes(option)
          ? formData.dietaryPreference.filter(d => d !== option)
          : [...formData.dietaryPreference, option];
        handleInputChange('dietaryPreference', updated);
      };

      // --- API Call Logic ---
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission (page reload)
        setLoading(true);
        setMessage(null); // Clear previous messages

        // Basic client-side validation (can be expanded)
        if (!formData.name || !formData.phone || !formData.email || !formData.address || !formData.mealPlan || !formData.foodPreference || !formData.password) {
          setMessage({ type: 'error', text: 'Please fill in all required fields (marked with *).' });
          setLoading(false);
          return;
        }

        try {
          // IMPORTANT: Changed to your deployed backend URL
          const response = await fetch('https://dietbro-api.onrender.com/api/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Send formData as JSON
          });

          const data = await response.json();

          if (response.ok) { // Check if response status is 2xx
            setMessage({ type: 'success', text: data.message || 'Registration successful!' });
            // Optionally clear form data after successful submission
            setFormData({
              name: '', phone: '', email: '', address: '', mealPlan: '',
              preferredDays: [], foodPreference: '', dietaryPreference: [],
              allergies: '', password: ''
            });
          } else {
            // Handle API errors (e.g., duplicate email/phone, validation errors from backend)
            setMessage({ type: 'error', text: data.message || 'Registration failed. Please try again.' });
          }
        } catch (error) {
          console.error('Error during registration:', error);
          setMessage({ type: 'error', text: 'Network error or server unreachable. Please try again later.' });
        } finally {
          setLoading(false);
        }
      };

      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const dietaryOptions = ['Standard Meal', 'High Protein', 'Low Carb', 'Custom Meal'];

      const testimonials = [
        {
          quote: "This is the first plan I actually stuck to.",
          author: "Rohan, Koramangala"
        },
        {
          quote: "The meals are incredibly fresh and delicious. I've never felt better!",
          author: "Priya, HSR Layout"
        },
        {
          quote: "Dietbro has completely transformed my eating habits. Highly recommended!",
          author: "Arjun, Indiranagar"
        },
        {
          quote: "Perfect for my busy lifestyle. Quality food delivered right to my door.",
          author: "Sneha, Whitefield"
        },
        {
          quote: "The variety and taste keep me excited about healthy eating every day.",
          author: "Vikram, Electronic City"
        }
      ];

      const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      };

      const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
                <button className="bg-brand-green-500 text-white px-4 py-2 rounded-xl hover:bg-brand-green-600 transition-colors font-semibold text-sm shadow-lg hover:shadow-xl">
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
                  Let's Build Your Perfect<br />
                  Meal Plan 💪
                </h1>
                <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                  Tell us your preferences and our team will reach out to customise a plan just for you.
                </p>
              </div>

              {/* Testimonial */}
              <div className="text-center mb-12">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 max-w-md mx-auto border border-brand-green-100/50 relative">
                  <div className="overflow-hidden">
                    <div className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                      {testimonials.map((testimonial, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                          <p className="text-gray-700 italic font-light mb-2">
                            "{testimonial.quote}"
                          </p>
                          <p className="text-sm text-brand-green-600 font-medium">
                            - {testimonial.author}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-brand-green-500 h-1 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${((currentTestimonial + 1) / testimonials.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={prevTestimonial}
                        className="text-brand-green-600 hover:text-brand-green-700 transition-colors text-sm font-medium"
                      >
                        Previous
                      </button>
                      <span className="text-xs text-gray-500">
                        {currentTestimonial + 1} of {testimonials.length}
                      </span>
                      <button
                        onClick={nextTestimonial}
                        className="text-brand-green-600 hover:text-brand-green-700 transition-colors text-sm font-medium"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Image Section */}
                <div className="relative">
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-brand-green-100/50 transform hover:-translate-y-1">
                    <img
                      src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop"
                      alt="Person preparing healthy meal"
                      className="w-full h-96 object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-green-900/10 to-transparent rounded-3xl pointer-events-none"></div>
                  </div>
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-2xl font-semibold shadow-lg text-sm transform rotate-3 hover:rotate-6 transition-transform">
                    Fresh Daily
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg text-sm transform -rotate-3 hover:-rotate-6 transition-transform">
                    Chef Crafted
                  </div>
                </div>

                {/* Form Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-brand-green-100/50 transform hover:-translate-y-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center gagalin-heading">
                    Tell Us About Yourself
                  </h2>

                  <form className="space-y-6" onSubmit={handleSubmit}> {/* Added onSubmit handler */}
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name*
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all bg-white/70 backdrop-blur-sm"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all bg-white/70 backdrop-blur-sm"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email*
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all bg-white/70 backdrop-blur-sm"
                        placeholder="Enter your email address"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Delivery Address*
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all bg-white/70 backdrop-blur-sm"
                        placeholder="Enter your delivery address"
                      />
                    </div>

                    {/* Meal Plan */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Meal Plan*
                      </label>
                      <div className="relative">
                        <select
                          value={formData.mealPlan}
                          onChange={(e) => handleInputChange('mealPlan', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all bg-white/70 backdrop-blur-sm appearance-none"
                        >
                          <option value="">Select a meal plan</option>
                          <option value="lunch">Lunch</option>
                          <option value="dinner">Dinner</option>
                          <option value="both">Both Lunch & Dinner</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Preferred Days */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Preferred Days*
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {days.map((day) => (
                          <button
                            key={day}
                            type="button"
                            onClick={() => handleDayToggle(day)}
                            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                              formData.preferredDays.includes(day)
                                ? 'bg-brand-green-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-brand-green-50'
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Food Preference */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Food Preference*
                      </label>
                      <div className="space-y-2">
                        {['Veg', 'Non-Veg'].map((option) => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="foodPreference"
                              value={option}
                              checked={formData.foodPreference === option}
                              onChange={(e) => handleInputChange('foodPreference', e.target.value)}
                              className="w-4 h-4 text-brand-green-500 border-gray-300 focus:ring-brand-green-200"
                            />
                            <span className="ml-2 text-sm text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Dietary Preference */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Dietary Preference*
                      </label>
                      <div className="space-y-2">
                        {dietaryOptions.map((option) => (
                          <label key={option} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.dietaryPreference.includes(option)}
                              onChange={() => handleDietaryToggle(option)}
                              className="w-4 h-4 text-brand-green-500 border-gray-300 rounded focus:ring-brand-green-200"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {option}
                              {option === 'Custom Meal' && (
                                <span className="ml-1 text-xs text-brand-green-600 font-medium">(Special layout available)</span>
                              )}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Allergies */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Allergies or Dietary Restrictions
                      </label>
                      <textarea
                        value={formData.allergies}
                        onChange={(e) => handleInputChange('allergies', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all bg-white/70 backdrop-blur-sm resize-none"
                        placeholder="Please mention any allergies or dietary restrictions"
                      />
                    </div>

                    {/* Message Display */}
                    {message && (
                      <div className={`p-3 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-4 pt-6">
                      <button
                        type="button"
                        onClick={onBack}
                        className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading} // Disable button while loading
                        className="flex-1 bg-brand-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Submitting...' : 'Continue'}
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      By clicking 'Save' you agree to our <a href="#" className="text-brand-green-500 hover:underline">Terms & Conditions</a> and <a href="#" className="text-brand-green-500 hover:underline">Privacy Policy</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default MealPlanForm;