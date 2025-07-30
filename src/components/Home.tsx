import React from 'react';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Features from './Features';
import Menu from './Menu';
import BlogSection from './BlogSection'; // Assuming this is for your blog section
import Testimonials from './Testimonials';

// You might also need to import any global CSS or Tailwind directives here
// For example: import './index.css';

const HomePage: React.FC = () => {
  // You can define any shared functions or states here if needed
  const handleGetStarted = () => {
    // Logic for what happens when 'Get Started' or 'View Plans' is clicked
    console.log('Get Started button clicked!');
    // Example: Scroll to a specific section, open a modal, or navigate
    window.location.href = '#plans-section'; // Example: Scroll to a section
  };

  const handleBlogsClick = () => {
    // Logic for what happens when 'View All Blogs' is clicked
    console.log('View All Blogs button clicked!');
    // Example: Navigate to a dedicated blogs page
    window.location.href = '/blogs';
  };

  return (
    <div>
      <Hero onGetStarted={handleGetStarted} />
      <HowItWorks onGetStarted={handleGetStarted} />
      <Features onGetStarted={handleGetStarted} />
      <Menu onGetStarted={handleGetStarted} />
      <BlogSection onGetStarted={handleGetStarted} onBlogsClick={handleBlogsClick} />
      <Testimonials onGetStarted={handleGetStarted} />
    </div>
  );
};

export default HomePage;