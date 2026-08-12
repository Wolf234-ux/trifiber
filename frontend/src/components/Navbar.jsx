import React from 'react';
import { ShoppingBag, Sparkles, Activity, ShieldCheck, FileCheck, Layers, ChevronRight } from 'lucide-react';

export default function Navbar({ currency, setCurrency, cartCount, setIsCartOpen, activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 transition-all">
      <div className="container-max flex items-center justify-between h-20">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('products')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-400 font-bold shadow-md group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-xl tracking-tight text-slate-900">
                TriFiber<span className="text-emerald-600 font-normal">Health</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                Post-GLP-1
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-500 tracking-wider uppercase font-medium">
              Better Gut • Better Metabolism
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'products'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            Formulas
          </button>
          
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Metabolic Quiz
          </button>

          <button
            onClick={() => setActiveTab('batch')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'batch'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Batch COA Portal
          </button>

          <button
            onClick={() => setActiveTab('claims')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'claims'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-blue-500" />
            Claims Engine
          </button>

          <button
            onClick={() => setActiveTab('marketing')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'marketing'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            Growth AI
          </button>
        </nav>

        {/* Currency Switcher & Cart Trigger */}
        <div className="flex items-center gap-3">
          
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="INR">🇮🇳 INR (₹)</option>
              <option value="USD">🇺🇸 USD ($)</option>
              <option value="AED">🇦🇪 AED (AED)</option>
            </select>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center p-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md active:scale-95"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
