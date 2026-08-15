import React, { useState } from 'react';
import { ShoppingBag, Check, ShieldCheck, Sparkles, RefreshCw, Zap, Star } from 'lucide-react';

export default function BerberinePage({ currency, addToCart, setActiveTab }) {
  const currencySymbols = { INR: '₹', USD: '$', AED: 'AED ' };
  const symbol = currencySymbols[currency] || '₹';

  const [isSubscribe, setIsSubscribe] = useState(true);

  const basePrice = { INR: 1299, USD: 34, AED: 119 }[currency] || 1299;
  const price = isSubscribe ? Math.round(basePrice * 0.85) : basePrice;
  const compareAt = Math.round(basePrice * 1.25);

  return (
    <div className="py-12 bg-white text-left">
      <div className="container-max">
        
        {/* Breadcrumb */}
        <div className="text-xs font-mono text-slate-500 mb-6 flex items-center gap-2">
          <button onClick={() => setActiveTab('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-emerald-700 font-bold">Berberine Balance</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Visual / Image Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-[32px] p-8 text-center space-y-6 shadow-sm">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-emerald-800 text-xs font-semibold border border-emerald-200 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Targeted Botanical Metabolic Support</span>
              </div>

              <div className="py-8 bg-white rounded-2xl border border-emerald-200 flex flex-col items-center justify-center space-y-3 shadow-sm">
                <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-700 font-heading text-3xl font-bold flex items-center justify-center border border-emerald-200">
                  97%+
                </div>
                <h3 className="font-heading text-2xl font-bold text-slate-900">Berberine Balance</h3>
                <p className="text-xs font-mono text-emerald-700 font-semibold">Standardized Berberis aristata + Piperine</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center border-t border-emerald-200 pt-6">
                <div>
                  <div className="font-heading text-xl font-bold text-slate-900">500mg</div>
                  <div className="text-[11px] text-slate-500 font-sans">Pure Berberine HCl</div>
                </div>
                <div>
                  <div className="font-heading text-xl font-bold text-slate-900">5mg</div>
                  <div className="text-[11px] text-slate-500 font-sans">Piperine Bio-Enhancer</div>
                </div>
              </div>

            </div>

            {/* FSSAI & Quality Badge */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>FSSAI Schedule IV Botanical Clearance</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Standardized under FSSAI Schedule IV for Botanical Extracts. Tested by SGS India laboratories for 97%+ assay purity and absence of residual extraction solvents.
              </p>
            </div>
          </div>

          {/* Right Column: Buying Options & Details */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>4.85 / 5.0</span>
                </div>
                <span className="text-xs text-slate-500">(218 Verified Customer Reviews)</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                Berberine Metabolic Balance
              </h1>
              
              <p className="text-slate-600 text-base leading-relaxed font-sans">
                Pure standardized Berberine HCl (97%+ assay purity) engineered for optimal gastrointestinal tolerability, glucose metabolism, and cellular AMPK pathway activation in the post-GLP-1 era.
              </p>
            </div>

            {/* Pricing Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs font-mono text-slate-500">Subscription Price</div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-bold text-slate-900">
                      {symbol}{price}
                    </span>
                    <span className="text-sm font-sans line-through text-slate-400">
                      {symbol}{compareAt}
                    </span>
                  </div>
                </div>
                <span className="tag tag-accent-2 text-xs font-bold font-mono">Save 15% VIP</span>
              </div>

              {/* Purchase Mode Toggle */}
              <div className="space-y-2 pt-2">
                <div
                  onClick={() => setIsSubscribe(true)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    isSubscribe
                      ? 'bg-white border-emerald-600 shadow-sm ring-2 ring-emerald-600/20'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="text-xs">
                    <div className="font-bold text-slate-900">Subscribe & Save (Recommended)</div>
                    <div className="text-slate-500 text-[11px]">Free delivery every 30 days. Pause or cancel anytime.</div>
                  </div>
                  <div className="font-heading text-sm font-bold text-emerald-700">{symbol}{price}</div>
                </div>

                <div
                  onClick={() => setIsSubscribe(false)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    !isSubscribe
                      ? 'bg-white border-emerald-600 shadow-sm ring-2 ring-emerald-600/20'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="text-xs">
                    <div className="font-bold text-slate-900">One-Time Purchase</div>
                    <div className="text-slate-500 text-[11px]">Single 30-day bottle (60 vegan capsules).</div>
                  </div>
                  <div className="font-heading text-sm font-bold text-slate-900">{symbol}{basePrice}</div>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={() => addToCart({
                  id: 'berberine-balance',
                  name: 'Berberine Metabolic Balance',
                  flavor: 'Unflavored Capsules',
                  format: '60 Vegan Capsules',
                  price: price
                })}
                className="btn btn-primary w-full py-4 text-base shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart ({symbol}{price})</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
