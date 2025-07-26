    // controllers/blogController.js - Using ES Module syntax

    import Blog from '../models/blog.js'; // Import the Blog model

    // @desc    Create new blog post
    // @route   POST /api/blogs
    // @access  Public
    const createBlog = async (req, res, next) => {
      try {
        const { title, content, author, tags } = req.body;

        const blog = await Blog.create({
          title,
          content,
          author,
          tags
        });

        res.status(201).json({
          success: true,
          message: 'Blog post created successfully!',
          data: blog
        });
      } catch (error) {
        next(error); // Pass error to global error handler
      }
    };

    // @desc    Get all blog posts
    // @route   GET /api/blogs
    // @access  Public
    const getBlogs = async (req, res, next) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.author) filter.author = req.query.author;
        if (req.query.tag) filter.tags = req.query.tag; // Assuming single tag query

        const blogs = await Blog.find(filter)
          .select('-__v')
          .sort({ publishedAt: -1 }) // Sort by newest first
          .skip(skip)
          .limit(limit);

        const total = await Blog.countDocuments(filter);

        res.json({
          success: true,
          data: blogs,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
          }
        });
      } catch (error) {
        next(error);
      }
    };

    // @desc    Get blog post by ID
    // @route   GET /api/blogs/:id
    // @access  Public
    const getBlogById = async (req, res, next) => {
      try {
        const blog = await Blog.findById(req.params.id).select('-__v');

        if (!blog) {
          return res.status(404).json({
            success: false,
            message: 'Blog post not found'
          });
        }

        // Increment view count (optional, but common for blogs)
        blog.views += 1;
        await blog.save();

        res.json({
          success: true,
          data: blog
        });
      } catch (error) {
        next(error);
      }
    };

    // @desc    Like a blog post
    // @route   PUT /api/blogs/:id/like
    // @access  Public
    const likeBlog = async (req, res, next) => {
      try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
          return res.status(404).json({
            success: false,
            message: 'Blog post not found'
          });
        }

        blog.likes += 1; // Increment like count
        await blog.save();

        res.json({
          success: true,
          message: 'Blog liked successfully!',
          data: { likes: blog.likes }
        });
      } catch (error) {
        next(error);
      }
    };

    // @desc    Get blog statistics
    // @route   GET /api/blogs/stats
    // @access  Public
    const getBlogStats = async (req, res, next) => {
      try {
        const stats = await Blog.aggregate([
          {
            $group: {
              _id: null,
              totalBlogs: { $sum: 1 },
              totalLikes: { $sum: '$likes' },
              totalViews: { $sum: '$views' },
              avgLikesPerBlog: { $avg: '$likes' },
              avgViewsPerBlog: { $avg: '$views' }
            }
          },
          {
            $project: {
              _id: 0,
              totalBlogs: 1,
              totalLikes: 1,
              totalViews: 1,
              avgLikesPerBlog: { $round: ['$avgLikesPerBlog', 2] }, // Round to 2 decimal places
              avgViewsPerBlog: { $round: ['$avgViewsPerBlog', 2] }
            }
          }
        ]);

        res.json({
          success: true,
          data: stats[0] || {
            totalBlogs: 0,
            totalLikes: 0,
            totalViews: 0,
            avgLikesPerBlog: 0,
            avgViewsPerBlog: 0
          }
        });
      } catch (error) {
        next(error);
      }
    };

    export {
      createBlog,
      getBlogs,
      getBlogById,
      likeBlog,
      getBlogStats
    };
    