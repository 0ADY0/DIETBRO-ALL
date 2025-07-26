// models/User.js - Using ES Module syntax

import mongoose from 'mongoose'; // Import mongoose

const userSchema = new mongoose.Schema({
  // Personal Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true, // Removes whitespace from both ends of a string
    maxlength: [100, 'Name cannot exceed 100 characters']
  },

  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true, // Ensures phone numbers are unique (this implicitly creates a unique index)
    trim: true,
    // Regex to validate a 10-digit phone number (adjust if international numbers are needed)
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Ensures email addresses are unique (this implicitly creates a unique index)
    lowercase: true, // Converts email to lowercase before saving
    trim: true,
    // Regex to validate email format
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },

  address: {
    type: String,
    required: [true, 'Delivery address is required'],
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters']
  },

  // Meal Preferences
  mealPlan: {
    type: String,
    required: [true, 'Meal plan is required'],
    enum: ['lunch', 'dinner', 'both'], // Only allows these specific values
    lowercase: true
  },

  preferredDays: [{ // Array of strings for preferred delivery days
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }],

  foodPreference: {
    type: String,
    required: [true, 'Food preference is required'],
    enum: ['Veg', 'Non-Veg'], // Vegetarian or Non-Vegetarian
  },

  dietaryPreference: [{ // Array of strings for dietary preferences
    type: String,
    enum: ['Standard Meal', 'High Protein', 'Low Carb', 'Custom Meal']
  }],

  allergies: {
    type: String,
    trim: true,
    maxlength: [1000, 'Allergies description cannot exceed 1000 characters']
  },

  // Subscription Status
  subscriptionStatus: {
    type: String,
    enum: ['pending', 'active', 'paused', 'cancelled'],
    default: 'pending' // Default status for new users
  },

  // No need to define createdAt and updatedAt here if timestamps: true is used
  // Mongoose will automatically add and manage these fields.
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Indexes for better query performance
// The 'unique: true' property on 'email' and 'phone' fields already creates unique indexes.
// So, we only need to explicitly define other indexes here.
userSchema.index({ createdAt: -1 }); // Descending index on createdAt for efficient sorting by creation time.

// Pre-save middleware to update the updatedAt field
// This is redundant if `timestamps: true` is used, as Mongoose handles it automatically.
// You can uncomment and use this if you need custom logic for `updatedAt`.
// userSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// Instance method to get user's full meal preferences
// Can be called on a user document: user.getMealPreferences()
userSchema.methods.getMealPreferences = function() {
  return {
    mealPlan: this.mealPlan,
    preferredDays: this.preferredDays,
    foodPreference: this.foodPreference,
    dietaryPreference: this.dietaryPreference,
    allergies: this.allergies
  };
};

// Static method to find users by meal plan
// Can be called directly on the model: User.findByMealPlan('lunch')
userSchema.statics.findByMealPlan = function(mealPlan) {
  return this.find({ mealPlan: mealPlan });
};

// Export the Mongoose model
export default mongoose.model('User', userSchema);
