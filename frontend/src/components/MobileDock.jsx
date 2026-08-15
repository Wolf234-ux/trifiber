import React from 'react';
import { Home, Leaf, Pill, HelpCircle, ShoppingBag } from 'lucide-react';

export default function MobileDock({ activeTab, setActiveTab, cartCount, setIsCartOpen }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'trifiber-daily', label: 'TriFiber', icon: Leaf },
    { id: 'berberine-balance', label: 'Berberine', icon: Pill },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#201e1d]/90 backdrop-blur-lg border-t border-[#f5ead8]/15 px-3 py-2 pb-[max(8px,env(safe-area-inset-bottom))] shadow-2xl transition-all">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all active:scale-95 ${
                isActive 
                  ? 'text-[#c67139] font-bold' 
                  : 'text-[#f5ead8]/60 hover:text-[#f5ead8]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] font-sans tracking-tight">{tab.label}</span>
            </button>
          );
        })}

        {/* Cart Quick Trigger in Mobile Dock */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[#f5ead8]/80 hover:text-[#f5ead8] transition-all relative active:scale-95"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-2 text-[#c67139]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#c67139] text-[#f5ead8] text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#201e1d]">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-sans tracking-tight font-semibold text-[#c67139]">Cart</span>
        </button>
      </div>
    </div>
  );
}
