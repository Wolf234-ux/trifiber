import React from 'react';
import { ShoppingBag, ChevronDown, Sparkles } from 'lucide-react';

export default function Navbar({ currency, setCurrency, cartCount, setIsCartOpen, activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-50 bg-[#f5ead8]/90 backdrop-blur-md border-b border-[#201e1d]/10 transition-all">
      <div className="container-max flex items-center justify-between h-20">
        
        {/* Brand Logo */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex flex-col items-start text-left group focus:outline-none"
        >
          <span className="font-serif text-2xl font-bold tracking-tight text-[#201e1d] group-hover:text-[#c67139] transition-colors">
            TriFiber<span className="text-[#c67139] ml-1">.</span>
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#7a8a5e] uppercase font-semibold">
            Gut + Metabolic Health
          </span>
        </button>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-6 font-sans text-sm font-medium text-[#201e1d]/80">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors hover:text-[#c67139] py-1 ${activeTab === 'home' ? 'text-[#c67139] font-bold border-b-2 border-[#c67139]' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('trifiber-daily')}
            className={`transition-colors hover:text-[#c67139] py-1 ${activeTab === 'trifiber-daily' ? 'text-[#c67139] font-bold border-b-2 border-[#c67139]' : ''}`}
          >
            TriFiber Daily
          </button>
          <button
            onClick={() => setActiveTab('berberine-balance')}
            className={`transition-colors hover:text-[#c67139] py-1 ${activeTab === 'berberine-balance' ? 'text-[#c67139] font-bold border-b-2 border-[#c67139]' : ''}`}
          >
            Berberine Balance
          </button>
          <button
            onClick={() => setActiveTab('why-fiber')}
            className={`transition-colors hover:text-[#c67139] py-1 ${activeTab === 'why-fiber' ? 'text-[#c67139] font-bold border-b-2 border-[#c67139]' : ''}`}
          >
            Why Fiber & Science
          </button>
          <button
            onClick={() => setActiveTab('batch')}
            className={`transition-colors hover:text-[#c67139] py-1 ${activeTab === 'batch' ? 'text-[#c67139] font-bold border-b-2 border-[#c67139]' : ''}`}
          >
            Quality QA
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`transition-colors hover:text-[#c67139] py-1 ${activeTab === 'quiz' ? 'text-[#c67139] font-bold border-b-2 border-[#c67139]' : ''}`}
          >
            Quiz
          </button>
          <button
            onClick={() => setActiveTab('marketing')}
            className={`transition-colors hover:text-[#c67139] py-1 ${activeTab === 'marketing' ? 'text-[#c67139] font-bold border-b-2 border-[#c67139]' : ''}`}
          >
            AI Suite
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          
          {/* Currency Selector */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="appearance-none bg-[#ebddc5] border border-[#201e1d]/15 text-[#201e1d] text-xs font-mono font-semibold py-1.5 px-3 pr-7 rounded-full cursor-pointer hover:border-[#c67139] transition-all focus:outline-none"
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="AED">AED</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#201e1d]/60 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn btn-primary relative group !py-2 !px-4"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="ml-1 bg-[#201e1d] text-[#f5ead8] text-xs font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto gap-4 px-4 py-2 border-t border-[#201e1d]/10 text-xs font-medium no-scrollbar">
        <button onClick={() => setActiveTab('home')} className={`shrink-0 ${activeTab === 'home' ? 'text-[#c67139] font-bold' : 'text-[#201e1d]/70'}`}>Home</button>
        <button onClick={() => setActiveTab('trifiber-daily')} className={`shrink-0 ${activeTab === 'trifiber-daily' ? 'text-[#c67139] font-bold' : 'text-[#201e1d]/70'}`}>TriFiber Daily</button>
        <button onClick={() => setActiveTab('berberine-balance')} className={`shrink-0 ${activeTab === 'berberine-balance' ? 'text-[#c67139] font-bold' : 'text-[#201e1d]/70'}`}>Berberine Balance</button>
        <button onClick={() => setActiveTab('why-fiber')} className={`shrink-0 ${activeTab === 'why-fiber' ? 'text-[#c67139] font-bold' : 'text-[#201e1d]/70'}`}>Science</button>
        <button onClick={() => setActiveTab('batch')} className={`shrink-0 ${activeTab === 'batch' ? 'text-[#c67139] font-bold' : 'text-[#201e1d]/70'}`}>Batch QA</button>
        <button onClick={() => setActiveTab('quiz')} className={`shrink-0 ${activeTab === 'quiz' ? 'text-[#c67139] font-bold' : 'text-[#201e1d]/70'}`}>Quiz</button>
        <button onClick={() => setActiveTab('marketing')} className={`shrink-0 ${activeTab === 'marketing' ? 'text-[#c67139] font-bold' : 'text-[#201e1d]/70'}`}>AI Suite</button>
      </div>
    </header>
  );
}
