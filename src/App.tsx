import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Menu from './components/Menu';
import BlogSection from './components/BlogSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import MealPlanForm from './components/MealPlanForm';
import FAQ from './components/FAQ';
import MenuPopup from './components/MenuPopup';
import LocationsPopup from './components/LocationsPopup';
import PlansPage from './components/PlansPage';
import BlogsPage from './components/BlogsPage';

function App() {
  const [showMealPlanForm, setShowMealPlanForm] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const [showLocationsPopup, setShowLocationsPopup] = useState(false);
  const [showPlansPage, setShowPlansPage] = useState(false);
  const [showBlogsPage, setShowBlogsPage] = useState(false);

  const handleGetStarted = () => {
    setShowMealPlanForm(true);
    setShowFAQ(false);
    setShowMenuPopup(false);
    setShowLocationsPopup(false);
    setShowPlansPage(false);
    setShowBlogsPage(false);
  };

  const handleBackToHome = () => {
    setShowMealPlanForm(false);
    setShowFAQ(false);
    setShowMenuPopup(false);
    setShowLocationsPopup(false);
    setShowPlansPage(false);
    setShowBlogsPage(false);
  };

  const handleFAQClick = () => {
    setShowFAQ(prev => !prev ? true : false);
    setShowMealPlanForm(false);
    setShowMenuPopup(false);
    setShowLocationsPopup(false);
    setShowPlansPage(false);
    setShowBlogsPage(false);
  };

  const handleMenuClick = () => {
    setShowMenuPopup(prev => !prev ? true : false);
    setShowMealPlanForm(false);
    setShowFAQ(false);
    setShowLocationsPopup(false);
    setShowPlansPage(false);
    setShowBlogsPage(false);
  };

  const handleLocationsClick = () => {
    setShowLocationsPopup(prev => !prev ? true : false);
    setShowMealPlanForm(false);
    setShowFAQ(false);
    setShowMenuPopup(false);
    setShowPlansPage(false);
    setShowBlogsPage(false);
  };

  const handlePlansClick = () => {
    setShowPlansPage(prev => !prev ? true : false);
    setShowMealPlanForm(false);
    setShowFAQ(false);
    setShowMenuPopup(false);
    setShowLocationsPopup(false);
    setShowBlogsPage(false);
  };

  const handleBlogsClick = () => {
    setShowBlogsPage(prev => !prev ? true : false);
    setShowMealPlanForm(false);
    setShowFAQ(false);
    setShowMenuPopup(false);
    setShowLocationsPopup(false);
    setShowPlansPage(false);
  };

  if (showBlogsPage) {
    return <BlogsPage onBack={handleBackToHome} onGetStarted={handleGetStarted} onFAQClick={handleFAQClick} onMenuClick={handleMenuClick} onPlansClick={handlePlansClick} onLocationsClick={handleLocationsClick} />;
  }

  if (showLocationsPopup) {
    return <LocationsPopup onBack={handleBackToHome} onGetStarted={handleGetStarted} onFAQClick={handleFAQClick} onMenuClick={handleMenuClick} onPlansClick={handlePlansClick} onBlogsClick={handleBlogsClick} />;
  }

  if (showPlansPage) {
    return <PlansPage onBack={handleBackToHome} onGetStarted={handleGetStarted} onFAQClick={handleFAQClick} onMenuClick={handleMenuClick} onLocationsClick={handleLocationsClick} onBlogsClick={handleBlogsClick} />;
  }

  if (showMenuPopup) {
    return <MenuPopup onBack={handleBackToHome} onGetStarted={handleGetStarted} onFAQClick={handleFAQClick} onPlansClick={handlePlansClick} onLocationsClick={handleLocationsClick} onBlogsClick={handleBlogsClick} />;
  }

  if (showFAQ) {
    return <FAQ onBack={handleBackToHome} onMenuClick={handleMenuClick} onGetStarted={handleGetStarted} onPlansClick={handlePlansClick} onLocationsClick={handleLocationsClick} onBlogsClick={handleBlogsClick} />;
  }

  if (showMealPlanForm) {
    return <MealPlanForm onBack={handleBackToHome} onFAQClick={handleFAQClick} onMenuClick={handleMenuClick} onPlansClick={handlePlansClick} onLocationsClick={handleLocationsClick} onBlogsClick={handleBlogsClick} />;
  }

  return (
    <div className="min-h-screen">
      <Header 
      onGetStarted={handleGetStarted} 
      onFAQClick={handleFAQClick} 
      onMenuClick={handleMenuClick}
      onLocationsClick={handleLocationsClick}
      onPlansClick={handlePlansClick}
      onBlogsClick={handleBlogsClick}
      onLogoClick={handleBackToHome}
      />
      <Hero onGetStarted={handleGetStarted} />
      <HowItWorks onGetStarted={handleGetStarted} />
      <Features onGetStarted={handleGetStarted} />
      <Menu onGetStarted={handleGetStarted} />
      <BlogSection onGetStarted={handleGetStarted} onBlogsClick={handleBlogsClick} />
      <Testimonials onGetStarted={handleGetStarted} />
      <Footer 
      onGetStarted={handleGetStarted}
      onFAQClick={handleFAQClick}
      onMenuClick={handleMenuClick}
      onPlansClick={handlePlansClick}
      onBlogsClick={handleBlogsClick}
      />
    </div>
  );
}

export default App;