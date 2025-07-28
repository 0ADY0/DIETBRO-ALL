import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Eye, Calendar, User, Tag, MessageCircle, Send, ThumbsUp, Search, Filter } from 'lucide-react';

interface BlogsPageProps {
  onBack: () => void;
  onGetStarted: () => void;
  onFAQClick: () => void;
  onMenuClick: () => void;
  onPlansClick: () => void;
  onLocationsClick: () => void;
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
  comments?: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

const BlogsPage: React.FC<BlogsPageProps> = ({ onBack, onGetStarted, onFAQClick, onMenuClick, onPlansClick, onLocationsClick }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const categories = ['All', 'Recipe', 'Review', 'Health Tips', 'Experience', 'Other'];

  // Mock comments data (in real app, this would come from API)
  const mockComments: { [key: string]: Comment[] } = {
    default: [
      {
        id: '1',
        author: 'Priya Sharma',
        content: 'This looks absolutely delicious! Thanks for sharing the recipe.',
        timestamp: '2024-01-15T10:30:00Z',
        likes: 5
      },
      {
        id: '2',
        author: 'Arjun Patel',
        content: 'I tried this yesterday and it turned out amazing. My family loved it!',
        timestamp: '2024-01-15T14:20:00Z',
        likes: 8
      },
      {
        id: '3',
        author: 'Sneha Reddy',
        content: 'Great tips! I never thought about adding those spices.',
        timestamp: '2024-01-15T16:45:00Z',
        likes: 3
      }
    ]
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/blogs?limit=20`);
      const data = await response.json();
      
      if (data.success) {
        // Add mock comments to blogs
        const blogsWithComments = data.data.map((blog: Blog) => ({
          ...blog,
          comments: mockComments.default || []
        }));
        setBlogs(blogsWithComments);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      // Fallback to mock data if API fails
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogClick = async (blog: Blog) => {
    setSelectedBlog(blog);
    
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

  const handleCommentLike = (commentId: string) => {
    if (selectedBlog) {
      const updatedComments = selectedBlog.comments?.map(comment =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      ) || [];
      
      setSelectedBlog({ ...selectedBlog, comments: updatedComments });
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && commentAuthor.trim() && selectedBlog) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: commentAuthor,
        content: newComment,
        timestamp: new Date().toISOString(),
        likes: 0
      };

      const updatedComments = [...(selectedBlog.comments || []), comment];
      setSelectedBlog({ ...selectedBlog, comments: updatedComments });
      setNewComment('');
      setCommentAuthor('');
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
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
                className="logo-text italic text-brand-green-500 hover:scale-105 transition-transform"
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
                Location's
              </button>
              <button 
                onClick={onFAQClick}
                className="text-gray-600 hover:text-brand-green-500 transition-colors font-medium text-sm"
              >
                FAQ
              </button>
              <span className="text-brand-green-500 font-semibold text-sm">Blogs</span>
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
        <div className="max-w-7xl mx-auto">
          {!selectedBlog ? (
            <>
              {/* Title Section */}
              <div className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-brand-green-600 mb-4 tracking-tight metropolis-heading">
                  Food Stories & Community
                </h1>
                <p className="text-lg text-gray-600 font-light">
                  Discover amazing food experiences shared by our community
                </p>
              </div>

              {/* Search and Filter */}
              <div className="mb-8 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search blogs..."
                    className="w-full px-4 py-3 pl-12 rounded-2xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all bg-white/70 backdrop-blur-sm"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                
                <div className="flex gap-2 overflow-x-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                        selectedCategory === category
                          ? 'bg-brand-green-500 text-white shadow-lg'
                          : 'bg-white/70 text-gray-600 hover:bg-brand-green-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blog Grid */}
              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
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
                  {filteredBlogs.map((blog) => (
                    <div 
                      key={blog._id} 
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-green-100/50 group transform hover:-translate-y-1 cursor-pointer"
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
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 metropolis-heading group-hover:text-brand-green-600 transition-colors">
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
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{blog.comments?.length || 0}</span>
                          </div>
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

              {filteredBlogs.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No blogs found matching your criteria.</p>
                </div>
              )}
            </>
          ) : (
            /* Blog Detail View */
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={() => setSelectedBlog(null)}
                className="flex items-center gap-2 text-brand-green-600 hover:text-brand-green-700 mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
              </button>

              <article className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-brand-green-100/50">
                {/* Blog Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
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
                  
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 metropolis-heading">
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
                </div>

                {/* Blog Content */}
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedBlog.content}
                  </p>
                </div>

                {/* Tags */}
                {selectedBlog.tags.length > 0 && (
                  <div className="mb-8 pt-6 border-t border-gray-200">
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

                {/* Comments Section */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 metropolis-heading">
                    Comments ({selectedBlog.comments?.length || 0})
                  </h3>

                  {/* Add Comment Form */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Add a Comment</h4>
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={commentAuthor}
                        onChange={(e) => setCommentAuthor(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all"
                      />
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                        placeholder="Share your thoughts..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all resize-none"
                      />
                      <button
                        onClick={handleAddComment}
                        disabled={!newComment.trim() || !commentAuthor.trim()}
                        className="bg-brand-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Post Comment
                      </button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {selectedBlog.comments?.map((comment) => (
                      <div key={comment.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{comment.author}</span>
                            <span className="text-sm text-gray-500">{formatTimeAgo(comment.timestamp)}</span>
                          </div>
                          <button
                            onClick={() => handleCommentLike(comment.id)}
                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-green-600 transition-colors"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>{comment.likes}</span>
                          </button>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;