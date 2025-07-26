// routes/userRoutes.js

import express from 'express';
// Import all user controller functions
import {
  registerUser, // <--- This needs to be 'registerUser', not 'createUser'
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats
} from '../controllers/userController.js';

const router = express.Router();

// Public route for user registration
router.post('/register', registerUser);

// Admin-only routes (will need authentication/authorization middleware later)
router.get('/', getUsers); // GET /api/users
router.get('/stats', getUserStats); // GET /api/users/stats
router.get('/:id', getUserById); // GET /api/users/:id
router.put('/:id', updateUser); // PUT /api/users/:id
router.delete('/:id', deleteUser); // DELETE /api/users/:id

export default router;
