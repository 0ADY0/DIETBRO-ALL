// controllers/userController.js - Using ES Module syntax

import User from '../models/user.js'; // Import the User model
import asyncHandler from 'express-async-handler'; // For cleaner async error handling
import bcrypt from 'bcryptjs'; // For password hashing

// @desc    Register a new user (formerly createUser)
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    phone,
    email,
    address,
    mealPlan,
    preferredDays,
    foodPreference,
    dietaryPreference,
    allergies,
    password // Now expecting password for registration
  } = req.body;

  // --- Basic Validation for Registration ---
  // Ensure all strictly required fields are present
  if (!name || !phone || !email || !address || !mealPlan || !foodPreference || !password) {
    res.status(400);
    throw new Error('Please enter all required fields: name, phone, email, address, mealPlan, foodPreference, and password.');
  }

  // Check if user already exists by email or phone
  const existingUser = await User.findOne({
    $or: [{ email }, { phone }]
  });

  if (existingUser) {
    const field = existingUser.email === email ? 'email' : 'phone';
    res.status(400);
    throw new Error(`User with this ${field} already exists.`);
  }

  // --- Password Hashing ---
  const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the provided password

  // Create new user in the database with the hashed password
  const user = await User.create({
    name,
    phone,
    email,
    address,
    mealPlan,
    preferredDays,
    foodPreference,
    dietaryPreference,
    allergies,
    password: hashedPassword, // Store the hashed password
  });

  // Respond with success message and created user data (excluding password)
  if (user) {
    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        mealPlan: user.mealPlan,
        foodPreference: user.foodPreference,
        subscriptionStatus: user.subscriptionStatus,
        // In a later step, we will generate and send a JWT token here for authentication
        // token: generateToken(user._id),
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data provided.'); // Should ideally not happen if validation passes
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin only) - Authentication/Authorization middleware would be applied here
const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = parseInt(req.query.limit) || 10; // Number of items per page
  const skip = (page - 1) * limit; // Number of items to skip

  // Build filter object based on query parameters
  const filter = {};
  if (req.query.mealPlan) filter.mealPlan = req.query.mealPlan;
  if (req.query.foodPreference) filter.foodPreference = req.query.foodPreference;
  if (req.query.subscriptionStatus) filter.subscriptionStatus = req.query.subscriptionStatus;

  // Fetch users with pagination, sorting, and field selection
  const users = await User.find(filter)
    .select('-__v -password') // Exclude Mongoose's internal version key and password
    .sort({ createdAt: -1 }) // Sort by creation date, newest first
    .skip(skip)
    .limit(limit);

  // Get total count of documents matching the filter for pagination info
  const total = await User.countDocuments(filter);

  res.json({
    success: true,
    data: users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit) // Total number of pages
    }
  });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private (Admin only)
const getUserById = asyncHandler(async (req, res) => {
  // Find user by ID and exclude version key and password
  const user = await User.findById(req.params.id).select('-__v -password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    success: true,
    data: user
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Admin only)
const updateUser = asyncHandler(async (req, res) => {
  // Find user by ID and update with request body, return new document, run schema validators
  // If password is being updated, it should be hashed here as well.
  // For simplicity, this example doesn't hash password on update.
  // In a real app, you'd have separate logic for password changes.
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true, // Return the updated document
      runValidators: true // Run Mongoose schema validators on update
    }
  ).select('-__v -password'); // Exclude password from response

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    success: true,
    message: 'User updated successfully',
    data: user
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
const deleteUser = asyncHandler(async (req, res) => {
  // Find user by ID and delete
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private (Admin only)
const getUserStats = asyncHandler(async (req, res) => {
  // Aggregate pipeline to calculate various user statistics
  const stats = await User.aggregate([
    {
      $group: {
        _id: null, // Group all documents into a single group
        totalUsers: { $sum: 1 }, // Count total users
        vegUsers: {
          $sum: { $cond: [{ $eq: ['$foodPreference', 'Veg'] }, 1, 0] } // Count Veg users
        },
        nonVegUsers: {
          $sum: { $cond: [{ $eq: ['$foodPreference', 'Non-Veg'] }, 1, 0] } // Count Non-Veg users
        },
        lunchUsers: {
          $sum: { $cond: [{ $eq: ['$mealPlan', 'lunch'] }, 1, 0] } // Count Lunch meal plan users
        },
        dinnerUsers: {
          $sum: { $cond: [{ $eq: ['$mealPlan', 'dinner'] }, 1, 0] } // Count Dinner meal plan users
        },
        bothMealsUsers: {
          $sum: { $cond: [{ $eq: ['$mealPlan', 'both'] }, 1, 0] } // Count Both meal plan users
        },
        activeSubscriptions: {
          $sum: { $cond: [{ $eq: ['$subscriptionStatus', 'active'] }, 1, 0] } // Count active subscriptions
        },
        pendingSubscriptions: {
          $sum: { $cond: [{ $eq: ['$subscriptionStatus', 'pending'] }, 1, 0] } // Count pending subscriptions
        }
      }
    },
    {
      // Project to remove the _id field from the final output if not needed
      $project: {
        _id: 0,
        totalUsers: 1,
        vegUsers: 1,
        nonVegUsers: 1,
        lunchUsers: 1,
        dinnerUsers: 1,
        bothMealsUsers: 1,
        activeSubscriptions: 1,
        pendingSubscriptions: 1
      }
    }
  ]);

  // Return the first element of the stats array (which contains the grouped stats)
  // Provide default values if no users exist (stats array would be empty)
  res.json({
    success: true,
    data: stats[0] || {
      totalUsers: 0,
      vegUsers: 0,
      nonVegUsers: 0,
      lunchUsers: 0,
      dinnerUsers: 0,
      bothMealsUsers: 0,
      activeSubscriptions: 0,
      pendingSubscriptions: 0
    }
  });
});

// Export all controller functions as named exports
export {
  registerUser, // Renamed from createUser
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats
};
