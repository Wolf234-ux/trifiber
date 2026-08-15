import React, { useState, useEffect } from 'react';
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
import OwnerAuthModal from './components/OwnerAuthModal';
import MobileDock from './components/MobileDock';
import Footer from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState('INR');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [toastMessage, setToastMessage] = useState(null);
  
  // Owner Authentication State (Restricts AI Suite & Campaign Tools)
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);

  // Discreet Owner Access Trigger: Append ?admin=true or ?owner=true to URL to unlock PIN prompt
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || params.get('owner') === 'true') {
      setIsOwnerModalOpen(true);
    }
  }, []);

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

  const handleTabChange = (tab) => {
    if (tab === 'marketing' && !isOwnerAuthenticated) {
      setIsOwnerModalOpen(true);
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-600 relative">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold font-sans">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 font-mono text-xs text-orange-400 underline font-bold"
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
        setActiveTab={handleTabChange}
        isOwnerAuthenticated={isOwnerAuthenticated}
        onOpenOwnerModal={() => setIsOwnerModalOpen(true)}
      />

      {/* Main Content Area (With Mobile Bottom Safe Padding) */}
      <main className="flex-1 pb-20 lg:pb-0">
        {activeTab === 'home' && (
          <CleanHome
            currency={currency}
            addToCart={addToCart}
            setActiveTab={handleTabChange}
          />
        )}

        {activeTab === 'trifiber-daily' && (
          <TriFiberDailyPage
            currency={currency}
            addToCart={addToCart}
            setActiveTab={handleTabChange}
          />
        )}

        {activeTab === 'berberine-balance' && (
          <BerberinePage
            currency={currency}
            addToCart={addToCart}
            setActiveTab={handleTabChange}
          />
        )}

        {activeTab === 'why-fiber' && (
          <WhyFiberScience setActiveTab={handleTabChange} />
        )}

        {activeTab === 'batch' && (
          <div className="pt-6">
            <BatchQA />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="pt-6">
            <MetabolicQuiz setActiveTab={handleTabChange} addToCart={addToCart} />
          </div>
        )}

        {activeTab === 'claims' && (
          <div className="pt-6">
            <ClaimsChecker />
          </div>
        )}

        {/* Owner-Only AI Suite Section */}
        {activeTab === 'marketing' && (
          <div className="pt-6">
            {isOwnerAuthenticated ? (
              <MarketingSuite />
            ) : (
              <CleanHome
                currency={currency}
                addToCart={addToCart}
                setActiveTab={handleTabChange}
              />
            )}
          </div>
        )}
      </main>

      {/* Mobile Glassmorphic Bottom Dock (iOS & Android App Navigation) */}
      <MobileDock
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        cart={cart}
        setCart={setCart}
        currency={currency}
      />

      {/* Owner Security Authentication Modal */}
      <OwnerAuthModal
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
        onSuccess={() => {
          setIsOwnerAuthenticated(true);
          setActiveTab('marketing');
          triggerToast('Welcome Website Owner! AI Suite Unlocked.');
        }}
      />

      {/* Footer */}
      <Footer 
        setActiveTab={handleTabChange} 
        onOpenOwnerModal={() => setIsOwnerModalOpen(true)}
        isOwnerAuthenticated={isOwnerAuthenticated}
      />

    </div>
  );
}
