import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import MetabolicQuiz from './components/MetabolicQuiz';
import BatchQA from './components/BatchQA';
import ClaimsChecker from './components/ClaimsChecker';
import MarketingSuite from './components/MarketingSuite';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState('INR');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
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
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold font-sans">{toastMessage}</span>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="ml-2 font-mono text-[11px] text-amber-400 underline hover:text-amber-300 font-bold"
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
        {activeTab === 'products' && (
          <>
            <Hero setActiveTab={setActiveTab} />
            <Products currency={currency} addToCart={addToCart} />
            <MetabolicQuiz setActiveTab={setActiveTab} />
            <BatchQA />
          </>
        )}

        {activeTab === 'quiz' && (
          <div className="pt-8">
            <MetabolicQuiz setActiveTab={setActiveTab} />
          </div>
        )}

        {activeTab === 'batch' && (
          <div className="pt-8">
            <BatchQA />
          </div>
        )}

        {activeTab === 'claims' && (
          <div className="pt-8">
            <ClaimsChecker />
          </div>
        )}

        {activeTab === 'marketing' && (
          <div className="pt-8">
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
