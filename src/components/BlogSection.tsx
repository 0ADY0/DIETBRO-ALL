import React, { useState, useEffect } from 'react';
import { PenTool, Heart, Eye, Calendar, User, Tag, X, Send, Loader } from 'lucide-react';

interface BlogSectionProps {
  onGetStarted?: () => void;
  onBlogsClick?: () => void;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    name: string;
    email: string;
  };
  category: string;
  tags: string[];
  likes: number;
  views: number;
  publishedAt: string;
}

const BlogSection: React.FC<BlogSectionProps> = ({ onGetStarted, onBlogsClick }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBlogPopup, setShowBlogPopup] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: {
      name: '',
      email: ''
    },
    category: 'Experience',
    tags: [] as string[],
    tagInput: ''
  });

  const categories = ['Recipe', 'Review', 'Health Tips', 'Experience', 'Other'];

  // Fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/blogs?limit=6`);
      const data = await response.json();
      
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogClick = async (blog: Blog) => {
    setSelectedBlog(blog);
    setShowBlogPopup(true);
    
    // Increment views
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      await fetch(`${apiUrl}/blogs/${blog._id}`, {
        method: 'GET'
      });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const handleLike = async (blogId: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/blogs/${blogId}/like`, {
        method: 'PUT'
      });
      
      if (response.ok) {
        // Update local state
        setBlogs(prev => prev.map(blog => 
          blog._id === blogId ? { ...blog, likes: blog.likes + 1 } : blog
        ));
        
        if (selectedBlog && selectedBlog._id === blogId) {
          setSelectedBlog(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
        }
      }
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    if (field.startsWith('author.')) {
      const authorField = field.split('.')[1];
      setBlogForm(prev => ({
        ...prev,
        author: { ...prev.author, [authorField]: value }
      }));
    } else {
      setBlogForm(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleAddTag = () => {
    if (blogForm.tagInput.trim() && !blogForm.tags.includes(blogForm.tagInput.trim())) {
      setBlogForm(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: ''
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setBlogForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmitBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    if (!blogForm.title || !blogForm.content || !blogForm.author.name || !blogForm.author.email) {
      setSubmitError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: blogForm.title,
          content: blogForm.content,
          excerpt: blogForm.excerpt,
          author: blogForm.author,
          category: blogForm.category,
          tags: blogForm.tags
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage('Blog post created successfully!');
        setBlogForm({
          title: '',
          content: '',
          excerpt: '',
          author: { name: '', email: '' },
          category: 'Experience',
          tags: [],
          tagInput: ''
        });
        fetchBlogs(); // Refresh blogs
        setTimeout(() => {
          setShowCreatePopup(false);
          setSubmitMessage('');
        }, 2000);
      } else {
        setSubmitError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <section id="blogs" className="py-20 lg:py-28 bg-gradient-to-br from-brand-green-50 via-white to-brand-green-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-brand-green-500 rounded-full blur-3xl float"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-brand-green-600 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6 tracking-tight gagalin-heading text-reveal">
              Food Stories & Experiences
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto mb-8 text-reveal" style={{ animationDelay: '0.2s' }}>
              Share your culinary journey, discover amazing recipes, and connect with fellow food lovers in our community.
            </p>
            
            <button 
              onClick={() => setShowCreatePopup(true)}
              className="btn-primary bg-gradient-brand text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-green-600 transition-all text-lg shadow-glow hover:shadow-glow-lg transform hover:-translate-y-2 hover:scale-105 interactive inline-flex items-center gap-3"
            >
              <PenTool className="w-5 h-5" />
              Share Your Food Story
            </button>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="floating-card bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <div 
                  key={blog._id} 
                  className="floating-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-glow transition-all duration-500 group stagger-animation hover-lift cursor-pointer"
                  onClick={() => handleBlogClick(blog)}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      blog.category === 'Recipe' ? 'bg-orange-100 text-orange-600' :
                      blog.category === 'Review' ? 'bg-blue-100 text-blue-600' :
                      blog.category === 'Health Tips' ? 'bg-green-100 text-green-600' :
                      blog.category === 'Experience' ? 'bg-purple-100 text-purple-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {blog.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold gradient-text mb-3 gagalin-heading group-hover:text-brand-green-600 transition-colors">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 font-light">
                    {blog.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{blog.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(blog.publishedAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{blog.views}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(blog._id);
                        }}
                        className="flex items-center gap-1 hover:text-red-500 transition-colors"
                      >
                        <Heart className="w-3 h-3" />
                        <span>{blog.likes}</span>
                      </button>
                    </div>
                    
                    {blog.tags.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{blog.tags[0]}</span>
                        {blog.tags.length > 1 && (
                          <span className="text-xs text-gray-400">+{blog.tags.length - 1}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View More Button */}
          <div className="text-center mt-12">
            <button 
              onClick={onBlogsClick}
              className="bg-white text-brand-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl border-2 border-brand-green-200 hover:border-brand-green-400"
            >
              View All Blogs
            </button>
          </div>
        </div>
      </section>

      {/* Blog Reading Popup */}
      {showBlogPopup && selectedBlog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-4xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedBlog.category === 'Recipe' ? 'bg-orange-100 text-orange-600' :
                  selectedBlog.category === 'Review' ? 'bg-blue-100 text-blue-600' :
                  selectedBlog.category === 'Health Tips' ? 'bg-green-100 text-green-600' :
                  selectedBlog.category === 'Experience' ? 'bg-purple-100 text-purple-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {selectedBlog.category}
                </span>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{selectedBlog.views}</span>
                  </div>
                  <button 
                    onClick={() => handleLike(selectedBlog._id)}
                    className="flex items-center gap-1 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    <span>{selectedBlog.likes}</span>
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setShowBlogPopup(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 gagalin-heading">
                {selectedBlog.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{selectedBlog.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedBlog.publishedAt)}</span>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedBlog.content}
                </p>
              </div>
              
              {selectedBlog.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-4 h-4 text-gray-400" />
                    {selectedBlog.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-brand-green-100 text-brand-green-600 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Blog Popup */}
      {showCreatePopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-4xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 gagalin-heading">Share Your Food Story</h2>
              <button 
                onClick={() => setShowCreatePopup(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitBlog} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Success/Error Messages */}
              {submitMessage && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <p className="text-green-800 text-center font-medium">{submitMessage}</p>
                </div>
              )}
              
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-red-800 text-center font-medium">{submitError}</p>
                </div>
              )}

              <div className="space-y-6">
                {/* Author Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      value={blogForm.author.name}
                      onChange={(e) => handleFormChange('author.name', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email*
                    </label>
                    <input
                      type="email"
                      value={blogForm.author.email}
                      onChange={(e) => handleFormChange('author.email', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title*
                  </label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all"
                    placeholder="Give your story a catchy title"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => handleFormChange('category', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Story*
                  </label>
                  <textarea
                    value={blogForm.content}
                    onChange={(e) => handleFormChange('content', e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all resize-none"
                    placeholder="Share your food experience, recipe, or tips..."
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Short Description
                  </label>
                  <textarea
                    value={blogForm.excerpt}
                    onChange={(e) => handleFormChange('excerpt', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all resize-none"
                    placeholder="Brief description of your story (optional)"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={blogForm.tagInput}
                      onChange={(e) => handleFormChange('tagInput', e.target.value)}
                      className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all"
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-brand-green-500 text-white rounded-xl hover:bg-brand-green-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blogForm.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-brand-green-100 text-brand-green-600 rounded-full text-sm font-medium flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreatePopup(false)}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-brand-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Publish Story
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogSection;