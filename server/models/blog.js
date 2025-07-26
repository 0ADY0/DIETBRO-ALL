    // models/Blog.js - Using ES Module syntax

    import mongoose from 'mongoose';

    const blogSchema = new mongoose.Schema({
      title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
      },
      content: {
        type: String,
        required: [true, 'Blog content is required'],
        trim: true,
        minlength: [50, 'Content must be at least 50 characters long']
      },
      author: {
        type: String, // Or mongoose.Schema.Types.ObjectId, ref: 'User' if you link to a User
        required: [true, 'Author name is required'],
        trim: true,
        maxlength: [100, 'Author name cannot exceed 100 characters']
      },
      tags: [{ // Array of strings for categories/tags
        type: String,
        trim: true,
        lowercase: true
      }],
      likes: {
        type: Number,
        default: 0
      },
      views: {
        type: Number,
        default: 0
      },
      // You can add an image field if you plan to store image URLs
      // imageUrl: {
      //   type: String,
      //   trim: true
      // },
      publishedAt: {
        type: Date,
        default: Date.now
      }
    }, {
      timestamps: true // Automatically adds createdAt and updatedAt
    });

    // Indexes for better query performance
    blogSchema.index({ title: 1 });
    blogSchema.index({ author: 1 });
    blogSchema.index({ tags: 1 }); // Multi-key index for array
    blogSchema.index({ publishedAt: -1 });

    export default mongoose.model('Blog', blogSchema);
    