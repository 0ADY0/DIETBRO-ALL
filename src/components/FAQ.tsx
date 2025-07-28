import React, { useState } from 'react';
import { ArrowLeft, Search, Package, Truck, CreditCard, Users, FileText, ChevronDown } from 'lucide-react';

interface FAQProps {
  onBack: () => void;
  onMenuClick?: () => void;
  onGetStarted?: () => void;
  onPlansClick?: () => void;
  onLocationsClick?: () => void;
  onBlogsClick?: () => void;
  // Ensure all props used in header are defined here
}

// onBlogsClick is commented out for now
const FAQ: React.FC<FAQProps> = ({ onBack, onMenuClick, onGetStarted, onPlansClick, onLocationsClick /*, onBlogsClick */ }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const categories = [
    {
      id: 'product',
      title: 'Product',
      icon: <Package className="w-8 h-8 text-gray-400" />,
      questions: [
        {
          id: 'product-1',
          question: 'How long do my meals last?',
          answer: 'Our meals stay fresh for up to 5 days when refrigerated. Each meal comes with a clear expiration date for your safety and quality assurance.'
        },
        {
          id: 'product-2',
          question: 'Will I receive exactly what is shown in the images?',
          answer: 'Yes! Our chefs prepare each meal to match the images shown. While natural variations in ingredients may occur, we maintain consistent quality and presentation standards.'
        },
        {
          id: 'product-3',
          question: 'Are the meals organic?',
          answer: 'We source organic ingredients whenever possible and work with trusted local suppliers. All our meals are made with fresh, high-quality ingredients.'
        },
        {
          id: 'product-4',
          question: 'Can I customize my meals?',
          answer: 'Absolutely! You can customize your meal plan based on dietary preferences, allergies, and food restrictions during the signup process.'
        }
      ]
    },
    {
      id: 'delivery',
      title: 'Delivery',
      icon: <Truck className="w-8 h-8 text-gray-400" />,
      questions: [
        {
          id: 'delivery-1',
          question: 'What is delivery charge?',
          answer: 'Delivery is free for all orders above ₹500. For orders below ₹500, we charge a nominal delivery fee of ₹50 within Bangalore.'
        },
        {
          id: 'delivery-2',
          question: 'Where can you deliver?',
          answer: 'We currently deliver across Bangalore including areas like Koramangala, Indiranagar, HSR Layout, Whitefield, Electronic City, and more. Check our coverage area during checkout.'
        },
        {
          id: 'delivery-3',
          question: 'What are your delivery timings?',
          answer: 'We deliver between 11 AM to 2 PM for lunch and 6 PM to 9 PM for dinner. You can choose your preferred delivery slot during ordering.'
        }
      ]
    },
    {
      id: 'payment',
      title: 'Payment',
      icon: <CreditCard className="w-8 h-8 text-gray-400" />,
      questions: [
        {
          id: 'payment-1',
          question: 'Is there a delivery charge?',
          answer: 'Delivery is free for orders above ₹500. For smaller orders, a delivery charge of ₹50 applies within our service areas in Bangalore.'
        },
        {
          id: 'payment-2',
          question: 'What payment methods do you accept?',
          answer: 'We accept all major payment methods including UPI, credit/debit cards, net banking, and digital wallets like Paytm, PhonePe, and Google Pay.'
        },
        {
          id: 'payment-3',
          question: 'Can I get a refund?',
          answer: 'Yes, we offer full refunds for cancelled orders before preparation begins. For quality issues, we provide immediate replacements or refunds.'
        }
      ]
    },
    {
      id: 'orders',
      title: 'Orders',
      icon: <FileText className="w-8 h-8 text-gray-400" />,
      questions: [
        {
          id: 'orders-1',
          question: 'How do I track my order?',
          answer: 'You will receive SMS and email updates with tracking information. You can also call our customer support for real-time order status.'
        },
        {
          id: 'orders-2',
          question: 'Can I modify my order?',
          answer: 'Orders can be modified up to 2 hours before the scheduled delivery time. Contact our support team for assistance with changes.'
        },
        {
          id: 'orders-3',
          question: 'What if I miss my delivery?',
          answer: 'Our delivery partner will attempt to contact you. If unavailable, we can reschedule delivery for the next available slot at no extra charge.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account',
      icon: <Users className="w-8 h-8 text-gray-400" />,
      questions: [
        {
          id: 'account-1',
          question: 'How do I create an account?',
          answer: 'Simply click "Get Started" and fill in your details. You can also create an account during your first order checkout process.'
        },
        {
          id: 'account-2',
          question: 'Can I pause my subscription?',
          answer: 'Yes! You can pause your subscription anytime from your account dashboard. Resume whenever you are ready with no penalties.'
        },
        {
          id: 'account-3',
          question: 'How do I update my delivery address?',
          answer: 'Log into your account and go to "Delivery Addresses" to add, edit, or remove delivery locations. Changes apply to future orders.'
        }
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
              {/* Using font-oswald for logo consistency */}
              <button
                onClick={onBack}
                className="text-2xl font-black italic text-brand-green-500 interactive hover:scale-105 transition-transform font-oswald"
                style={{ outline: 'none', border: 'none', background: 'none', padding: 0, margin: 0 }}
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
                Locations
              </button>
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-brand-green-500 transition-colors font-medium text-sm"
              >
                FAQ
              </button>
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
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            {/* Using font-gagalin for heading consistency */}
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-green-600 mb-6 tracking-tight font-gagalin">
              Frequently Asked Questions
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative mb-12">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs..." 
                className="w-full px-4 py-3 pl-12 rounded-2xl border border-gray-200 focus:border-brand-green-400 focus:ring-2 focus:ring-brand-green-100 transition-all bg-white/70 backdrop-blur-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Category Icons */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {categories.map((category) => (
              <div key={category.id} className="text-center">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-green-100/50 group cursor-pointer">
                  <div className="flex justify-center mb-3">
                    {category.icon}
                  </div>
                  <h3 className="text-sm font-medium text-gray-700 group-hover:text-brand-green-600 transition-colors">
                    {category.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {filteredCategories.map((category) => (
              <div key={category.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-green-100/50">
                {/* Using font-gagalin for category title consistency */}
                <h2 className="text-2xl font-bold text-brand-green-600 mb-6 font-gagalin">
                  {category.title}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className="w-full px-6 py-4 text-left bg-gray-50/50 hover:bg-gray-100/50 transition-colors flex justify-between items-center"
                        aria-expanded={expandedItems.includes(item.id)} // Accessibility
                        aria-controls={`faq-answer-${item.id}`} // Accessibility
                      >
                        <span className="font-medium text-gray-900">{item.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 transition-transform ${
                            expandedItems.includes(item.id) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      {expandedItems.includes(item.id) && (
                        <div id={`faq-answer-${item.id}`} role="region" className="px-6 py-4 bg-white/50 border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="text-center mt-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-green-100/50">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-oswald text-shadow"> {/* Changed metropolis-subheading to font-oswald */}
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our support team is here to help you with any questions or concerns.
              </p>
              <button className="bg-brand-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-green-600 transition-colors shadow-lg hover:shadow-xl">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
