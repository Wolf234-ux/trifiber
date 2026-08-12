import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CleanHome from './components/CleanHome';
import Products from './components/Products';
import TriFiberDailyPage from './components/TriFiberDailyPage';
import BerberinePage from './components/BerberinePage';
import WhyFiberScience from './components/WhyFiberScience';
import MetabolicQuiz from './components/MetabolicQuiz';
import BatchQA from './components/BatchQA';
import ClaimsChecker from './components/ClaimsChecker';
import MarketingSuite from './components/MarketingSuite';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState('INR');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.format === product.format);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.format === product.format
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    triggerToast(`Added ${product.name} to cart!`);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f5ead8] text-[#201e1d] flex flex-col font-sans selection:bg-[#c67139]/20 selection:text-[#c67139]">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle2 className="w-5 h-5 text-[#7a8a5e] shrink-0" />
          <span className="text-xs font-semibold font-sans">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 font-mono text-xs text-[#c67139] underline font-bold"
          >
            View Cart ({cartCount})
          </button>
        </div>
      )}

      {/* Global Navigation */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <CleanHome
            currency={currency}
            addToCart={addToCart}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'trifiber-daily' && (
          <TriFiberDailyPage
            currency={currency}
            addToCart={addToCart}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'berberine-balance' && (
          <BerberinePage
            currency={currency}
            addToCart={addToCart}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'why-fiber' && (
          <WhyFiberScience setActiveTab={setActiveTab} />
        )}

        {activeTab === 'batch' && (
          <div className="pt-6">
            <BatchQA />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="pt-6">
            <MetabolicQuiz setActiveTab={setActiveTab} />
          </div>
        )}

        {activeTab === 'claims' && (
          <div className="pt-6">
            <ClaimsChecker />
          </div>
        )}

        {activeTab === 'marketing' && (
          <div className="pt-6">
            <MarketingSuite />
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        cart={cart}
        setCart={setCart}
        currency={currency}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
