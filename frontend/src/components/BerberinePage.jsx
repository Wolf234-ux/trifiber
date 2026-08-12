import React, { useState } from 'react';
import { ShoppingBag, Check, ShieldCheck, Sparkles, Star, Zap } from 'lucide-react';

export default function BerberinePage({ currency, addToCart, setActiveTab }) {
  const currencySymbols = { INR: '₹', USD: '$', AED: 'AED ' };
  const symbol = currencySymbols[currency] || '₹';

  const [isSubscribe, setIsSubscribe] = useState(true);

  const basePrice = { INR: 1299, USD: 34, AED: 119 }[currency] || 1299;
  const price = isSubscribe ? Math.round(basePrice * 0.85) : basePrice;
  const compareAt = Math.round(basePrice * 1.25);

  const productData = {
    id: 'berberine-balance',
    name: 'Berberine Metabolic Balance',
    tagline: 'Standardized Botanical Metabolic Support',
    flavor: 'Unflavored Capsules',
    format: '60 Vegan Capsules (30-Day Supply)',
    pricing: { INR: { price: price } }
  };

  return (
    <div className="py-12 bg-[#f5ead8]">
      <div className="container-max">
        
        {/* Breadcrumb */}
        <div className="text-xs font-mono text-[#201e1d]/60 mb-6 flex items-center gap-2">
          <button onClick={() => setActiveTab('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-[#7a8a5e] font-bold">Berberine Balance</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Visual / Image Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#e1eecc] border border-[#7a8a5e]/20 rounded-[32px] p-8 text-center space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0fae1] text-[#3d472b] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#7a8a5e]" />
                <span>Targeted Botanical Support</span>
              </div>

              <div className="py-8 bg-[#f5ead8] rounded-2xl border border-[#201e1d]/10 flex flex-col items-center justify-center space-y-3">
                <div className="w-24 h-24 rounded-full bg-[#7a8a5e]/20 flex items-center justify-center text-[#3d472b] font-serif text-3xl font-bold">
                  97%+
                </div>
                <h3 className="font-serif text-2xl text-[#201e1d]">Berberine HCl Purity</h3>
                <p className="text-xs font-mono text-[#7a8a5e]">Enhanced with 5mg Piperine Bio-Enhancer</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center border-t border-[#7a8a5e]/20 pt-6">
                <div>
                  <div className="font-serif text-xl text-[#201e1d]">500 mg</div>
                  <div className="text-[11px] text-[#201e1d]/60 font-sans">Berberine HCl Target</div>
                </div>
                <div>
                  <div className="font-serif text-xl text-[#201e1d]">5 mg</div>
                  <div className="text-[11px] text-[#201e1d]/60 font-sans">Piperine Extract</div>
                </div>
              </div>

            </div>

            {/* FSSAI & Regulatory Details */}
            <div className="bg-[#ebddc5] border border-[#201e1d]/10 rounded-2xl p-6 text-left space-y-2">
              <div className="flex items-center gap-2 text-[#201e1d] font-semibold text-sm">
                <ShieldCheck className="w-5 h-5 text-[#c67139]" />
                <span>FSSAI Schedule IV Compliant</span>
              </div>
              <p className="text-xs text-[#201e1d]/80 leading-relaxed">
                Standardized Botanical extract complying with FSSAI Schedule IV (Botanicals). Assay certified via High-Performance Liquid Chromatography (HPLC) by SGS Laboratories.
              </p>
            </div>
          </div>

          {/* Right Column: Buying Options & Details */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-amber-600 text-xs font-bold gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>4.85 / 5.0</span>
                </div>
                <span className="text-xs text-[#201e1d]/50">(218 Verified Customer Reviews)</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#201e1d] mb-2">
                Berberine Balance
              </h1>
              
              <p className="text-[#201e1d]/75 text-base">
                Pure standardized Berberine HCl (97%+ assay purity) engineered for optimal gastrointestinal tolerability, AMPK cellular pathway support, and steady glucose metabolism in the post-GLP-1 era.
              </p>
            </div>

            {/* Pricing Section */}
            <div className="bg-[#ebddc5] border border-[#201e1d]/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#201e1d]">
                  {symbol}{price}
                </span>
                <span className="text-base text-[#201e1d]/50 line-through">
                  {symbol}{compareAt}
                </span>
                {isSubscribe && (
                  <span className="tag tag-accent-2 text-xs">Save 15% Subscription</span>
                )}
              </div>

              {/* Purchase Options Toggle */}
              <div className="space-y-3">
                <label 
                  onClick={() => setIsSubscribe(true)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${isSubscribe ? 'border-[#7a8a5e] bg-[#f0fae1]' : 'border-[#201e1d]/15 bg-[#f5ead8]'}`}
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={isSubscribe} readOnly className="accent-[#7a8a5e]" />
                    <div>
                      <div className="text-sm font-bold text-[#201e1d]">Subscribe & Save 15%</div>
                      <div className="text-xs text-[#201e1d]/60">60 Capsules delivered monthly. Skip or cancel anytime.</div>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#7a8a5e]">{symbol}{price}</span>
                </label>

                <label 
                  onClick={() => setIsSubscribe(false)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${!isSubscribe ? 'border-[#7a8a5e] bg-[#f0fae1]' : 'border-[#201e1d]/15 bg-[#f5ead8]'}`}
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={!isSubscribe} readOnly className="accent-[#7a8a5e]" />
                    <div>
                      <div className="text-sm font-bold text-[#201e1d]">One-Time Purchase</div>
                      <div className="text-xs text-[#201e1d]/60">Single bottle (60 Vegan Capsules).</div>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#201e1d]">{symbol}{basePrice}</span>
                </label>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart({ ...productData, price: price })}
                className="btn btn-primary w-full text-base py-3.5 mt-4"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add Berberine Balance to Cart ({symbol}{price})</span>
              </button>
            </div>

            {/* Scientific Rationale */}
            <div className="space-y-3 pt-2 text-sm text-[#201e1d]/80">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#7a8a5e] shrink-0 mt-1" />
                <span><strong>AMPK Pathway Activation:</strong> Berberine stimulates AMP-activated protein kinase, promoting glucose uptake and insulin receptor sensitivity.</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#7a8a5e] shrink-0 mt-1" />
                <span><strong>Bio-Enhancer Piperine:</strong> 5mg standardized Black Pepper Extract enhances gastrointestinal absorption without gut distress.</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#7a8a5e] shrink-0 mt-1" />
                <span><strong>Post-GLP-1 Companion Routine:</strong> Supports natural metabolic maintenance and weight management longevity.</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
