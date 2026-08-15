import React from 'react';
import { ShoppingBag, ChevronDown, Crown } from 'lucide-react';

export default function Navbar({ 
  currency, 
  setCurrency, 
  cartCount, 
  setIsCartOpen, 
  activeTab, 
  setActiveTab,
  isOwnerAuthenticated
}) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="container-max flex items-center justify-between h-20">
        
        {/* Brand Logo */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex flex-col items-start text-left group focus:outline-none"
        >
          <span className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
            TriFiber<span className="text-orange-600 ml-0.5">.</span>
          </span>
          <span className="text-[10px] font-mono tracking-widest text-emerald-700 uppercase font-semibold">
            Gut + Metabolic Health
          </span>
        </button>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-6 font-sans text-sm font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors hover:text-orange-600 py-1 ${activeTab === 'home' ? 'text-orange-600 font-bold border-b-2 border-orange-600' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('trifiber-daily')}
            className={`transition-colors hover:text-orange-600 py-1 ${activeTab === 'trifiber-daily' ? 'text-orange-600 font-bold border-b-2 border-orange-600' : ''}`}
          >
            TriFiber Daily
          </button>
          <button
            onClick={() => setActiveTab('berberine-balance')}
            className={`transition-colors hover:text-orange-600 py-1 ${activeTab === 'berberine-balance' ? 'text-orange-600 font-bold border-b-2 border-orange-600' : ''}`}
          >
            Berberine Balance
          </button>
          <button
            onClick={() => setActiveTab('why-fiber')}
            className={`transition-colors hover:text-orange-600 py-1 ${activeTab === 'why-fiber' ? 'text-orange-600 font-bold border-b-2 border-orange-600' : ''}`}
          >
            Why Fiber & Science
          </button>
          <button
            onClick={() => setActiveTab('batch')}
            className={`transition-colors hover:text-orange-600 py-1 ${activeTab === 'batch' ? 'text-orange-600 font-bold border-b-2 border-orange-600' : ''}`}
          >
            Batch QA
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`transition-colors hover:text-orange-600 py-1 ${activeTab === 'quiz' ? 'text-orange-600 font-bold border-b-2 border-orange-600' : ''}`}
          >
            Metabolic Quiz
          </button>

          {/* Owner Only AI Suite Tab (Unlocked only when Owner PIN is verified) */}
          {isOwnerAuthenticated && (
            <button
              onClick={() => setActiveTab('marketing')}
              className={`transition-colors py-1 flex items-center gap-1.5 font-bold ${
                activeTab === 'marketing'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-orange-600/80 hover:text-orange-600'
              }`}
            >
              <Crown className="w-4 h-4 text-orange-600" />
              <span>Owner AI Suite</span>
            </button>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          
          {/* Currency Selector */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="appearance-none bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-semibold py-1.5 px-3 pr-7 rounded-full cursor-pointer hover:border-orange-500 transition-all focus:outline-none"
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="AED">AED</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn btn-primary relative group !py-2 !px-4"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="ml-1 bg-slate-900 text-white text-xs font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto gap-4 px-4 py-2.5 border-t border-slate-200/80 text-xs font-semibold no-scrollbar bg-slate-50">
        <button onClick={() => setActiveTab('home')} className={`shrink-0 ${activeTab === 'home' ? 'text-orange-600 font-bold' : 'text-slate-600'}`}>Home</button>
        <button onClick={() => setActiveTab('trifiber-daily')} className={`shrink-0 ${activeTab === 'trifiber-daily' ? 'text-orange-600 font-bold' : 'text-slate-600'}`}>TriFiber Daily</button>
        <button onClick={() => setActiveTab('berberine-balance')} className={`shrink-0 ${activeTab === 'berberine-balance' ? 'text-orange-600 font-bold' : 'text-slate-600'}`}>Berberine Balance</button>
        <button onClick={() => setActiveTab('why-fiber')} className={`shrink-0 ${activeTab === 'why-fiber' ? 'text-orange-600 font-bold' : 'text-slate-600'}`}>Science</button>
        <button onClick={() => setActiveTab('batch')} className={`shrink-0 ${activeTab === 'batch' ? 'text-orange-600 font-bold' : 'text-slate-600'}`}>Batch QA</button>
        <button onClick={() => setActiveTab('quiz')} className={`shrink-0 ${activeTab === 'quiz' ? 'text-orange-600 font-bold' : 'text-slate-600'}`}>Quiz</button>
        {isOwnerAuthenticated && (
          <button onClick={() => setActiveTab('marketing')} className={`shrink-0 text-orange-600 font-bold`}>👑 Owner AI</button>
        )}
      </div>
    </header>
  );
}
