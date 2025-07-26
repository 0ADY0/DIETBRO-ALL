// routes/blogRoutes.js - Using ES Module syntax

import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlogById,
  likeBlog,
  getBlogStats
} from '../controllers/blogController.js'; // Note the .js extension

const router = express.Router();

// @route   POST /api/blogs
// @desc    Create new blog post
// @access  Public
router.post('/', createBlog);

// @route   GET /api/blogs/stats
// @desc    Get blog statistics
// @access  Public
router.get('/stats', getBlogStats);

// @route   GET /api/blogs
// @desc    Get all blog posts with pagination and filtering
// @access  Public
router.get('/', getBlogs);

// @route   GET /api/blogs/:id
// @desc    Get blog post by ID
// @access  Public
router.get('/:id', getBlogById); // This is the dynamic route for a single blog

// @route   PUT /api/blogs/:id/like
// @desc    Like a blog post
// @access  Public
router.put('/:id/like', likeBlog); // This is the dynamic route for liking a blog

export default router;
// Note: Ensure that the blogController.js file has the corresponding functions defined
// for createBlog, getBlogs, getBlogById, likeBlog, and getBlog