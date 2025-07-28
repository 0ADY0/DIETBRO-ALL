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
//import OrdersPage from './components/OrdersPage'; // Ensure this component exists

function App() {
  const [showMealPlanForm, setShowMealPlanForm] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const [showLocationsPopup, setShowLocationsPopup] = useState(false);
  const [showPlansPage, setShowPlansPage] = useState(false);
  const [showBlogsPage, setShowBlogsPage] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  // Helper to reset all show states to false
  const resetAllShowStates = () => {
    setShowMealPlanForm(false);
    setShowOrders(false);
    setShowMenuPopup(false);
    setShowLocationsPopup(false);
    setShowPlansPage(false);
    setShowBlogsPage(false);
    setShowFAQ(false);
  };

  const handleGetStarted = () => {
    resetAllShowStates();
    setShowMealPlanForm(true);
  };

  const handleBackToHome = () => {
    resetAllShowStates();
  };

  const handleOrdersClick = () => {
    resetAllShowStates();
    setShowOrders(true);
  };

  const handleMenuClick = () => {
    if (!showMenuPopup) {
      resetAllShowStates();
      setShowMenuPopup(true);
    }
  };

  const handleLocationsClick = () => {
    if (!showLocationsPopup) {
      resetAllShowStates();
      setShowLocationsPopup(true);
    }
  };

  const handlePlansClick = () => {
    if (!showPlansPage) {
      resetAllShowStates();
      setShowPlansPage(true);
    }
  };

  const handleBlogsClick = () => {
    if (!showBlogsPage) {
      resetAllShowStates();
      setShowBlogsPage(true);
    }
  };

  const handleFAQClick = () => {
    if (!showFAQ) {
      resetAllShowStates();
      setShowFAQ(true);
    }
  };

  // Props object to pass consistently to components that need navigation
  const commonNavProps = {
    onBack: handleBackToHome,
    onGetStarted: handleGetStarted,
    onOrdersClick: handleOrdersClick,
    onMenuClick: handleMenuClick,
    onLocationsClick: handleLocationsClick,
    onPlansClick: handlePlansClick,
    onBlogsClick: handleBlogsClick,
    onFAQClick: handleFAQClick,
    onLogoClick: handleBackToHome, // Assuming logo click goes back to home
  };

  if (showFAQ) {
    return <FAQ {...commonNavProps} />;
  }

  if (showBlogsPage) {
    return <BlogsPage {...commonNavProps} />;
  }

  if (showLocationsPopup) {
    return <LocationsPopup {...commonNavProps} />;
  }

  if (showPlansPage) {
    return <PlansPage {...commonNavProps} />;
  }

  if (showMenuPopup) {
    return <MenuPopup {...commonNavProps} />;
  }

  //if (showOrders) {
    //return <OrdersPage {...commonNavProps} />;
 // }

  if (showMealPlanForm) {
    return <MealPlanForm {...commonNavProps} />;
  }

  return (
    <div className="min-h-screen">
      {/* Pass all common navigation props to Header and Footer */}
      <Header {...commonNavProps} />
      <Hero onGetStarted={handleGetStarted} />
      <HowItWorks onGetStarted={handleGetStarted} />
      <Features onGetStarted={handleGetStarted} />
      <Menu onGetStarted={handleGetStarted} />
      <BlogSection onGetStarted={handleGetStarted} onBlogsClick={handleBlogsClick} />
      <Testimonials onGetStarted={handleGetStarted} />
      <Footer {...commonNavProps} />
    </div>
  );
}

export default App;
