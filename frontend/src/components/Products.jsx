import React, { useState } from 'react';
import { ShoppingBag, Check, ShieldCheck, Sparkles, Star, ArrowRight } from 'lucide-react';

export default function Products({ currency, addToCart, setActiveTab }) {
  const currencySymbols = { INR: '₹', USD: '$', AED: 'AED ' };
  const symbol = currencySymbols[currency] || '₹';

  const prices = {
    trifiber: { INR: 1199, USD: 29, AED: 99 },
    berberine: { INR: 1299, USD: 34, AED: 119 },
  };

  const getPrice = (sku, isSub) => {
    const base = prices[sku][currency] || prices[sku]['INR'];
    return isSub ? Math.round(base * 0.85) : base;
  };

  const getCompareAt = (sku) => {
    const base = prices[sku][currency] || prices[sku]['INR'];
    return Math.round(base * 1.25);
  };

  return (
    <section id="products" className="py-16 bg-[#f5ead8]">
      <div className="container-max">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-12 space-y-3">
          <span className="tag tag-accent-2">The Range</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#201e1d]">
            Two products. One everyday metabolic-health platform.
          </h2>
          <p className="text-[#201e1d]/70 text-base">
            TriFiber builds the daily habit. Berberine deepens it. Take one, or run both together.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Product 1: TriFiber Daily */}
          <div className="bg-[#ebddc5] border border-[#201e1d]/10 rounded-[32px] p-8 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-6">
              
              <div className="flex items-start justify-between">
                <span className="tag tag-accent">Daily Multi-Fiber Drink</span>
                <span className="text-xs font-mono font-semibold text-[#c67139]">Lemon-Jeera</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-3xl text-[#201e1d]">TriFiber Daily</h3>
                <p className="text-sm text-[#201e1d]/75 leading-relaxed">
                  Soluble, insoluble, and prebiotic fiber in one scoop. Built to close the fiber gap without bloat or medicinal psyllium sludge.
                </p>
              </div>

              <div className="bg-[#f5ead8] rounded-2xl p-4 border border-[#201e1d]/10 space-y-2 text-xs text-[#201e1d]">
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-[#c67139]" />
                  <span>3.0g Standardized Oat Beta-Glucan</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-[#c67139]" />
                  <span>4.5g Prebiotic Acacia Fiber</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-[#c67139]" />
                  <span>2.5g Resistant Starch Blend</span>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-[#201e1d]/10 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#201e1d]">
                  {symbol}{getPrice('trifiber', true)}
                </span>
                <span className="text-xs text-[#201e1d]/60 font-sans">
                  / month on subscription · {symbol}{prices.trifiber[currency] || prices.trifiber['INR']} one-time
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => addToCart({
                    id: 'trifiber-daily',
                    name: 'TriFiber Daily',
                    flavor: 'Lemon-Jeera',
                    format: '30 Single-Serve Sachets',
                    price: getPrice('trifiber', true)
                  })}
                  className="btn btn-primary flex-1 py-3"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('trifiber-daily')}
                  className="btn btn-secondary py-3 px-4"
                >
                  <span>Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product 2: Berberine Balance */}
          <div className="bg-[#f0fae1] border border-[#7a8a5e]/20 rounded-[32px] p-8 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-6">
              
              <div className="flex items-start justify-between">
                <span className="tag tag-accent-2">Standardized Botanical</span>
                <span className="text-xs font-mono font-semibold text-[#7a8a5e]">97%+ Purity</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-3xl text-[#201e1d]">Berberine Balance</h3>
                <p className="text-sm text-[#201e1d]/75 leading-relaxed">
                  Pure standardized Berberine HCl (500mg target) enhanced with Piperine for optimal gastrointestinal bioavailability and AMPK pathway activation.
                </p>
              </div>

              <div className="bg-[#f5ead8] rounded-2xl p-4 border border-[#201e1d]/10 space-y-2 text-xs text-[#201e1d]">
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-[#7a8a5e]" />
                  <span>500mg Pure Berberine HCl (97%+ Assay)</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-[#7a8a5e]" />
                  <span>5mg Piperine Bio-Enhancer Extract</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-[#7a8a5e]" />
                  <span>FSSAI Schedule IV Botanical Clearance</span>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-[#7a8a5e]/20 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#201e1d]">
                  {symbol}{getPrice('berberine', true)}
                </span>
                <span className="text-xs text-[#201e1d]/60 font-sans">
                  / month on subscription · {symbol}{prices.berberine[currency] || prices.berberine['INR']} one-time
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => addToCart({
                    id: 'berberine-balance',
                    name: 'Berberine Metabolic Balance',
                    flavor: 'Unflavored Capsules',
                    format: '60 Vegan Capsules',
                    price: getPrice('berberine', true)
                  })}
                  className="btn btn-primary flex-1 py-3"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('berberine-balance')}
                  className="btn btn-secondary py-3 px-4"
                >
                  <span>Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
