import React, { useState } from 'react';
import { ShoppingBag, Check, ShieldCheck, Sparkles, RefreshCw, Zap, Star } from 'lucide-react';

export default function Products({ currency, addToCart }) {
  const currencySymbols = { INR: '₹', USD: '$', AED: 'AED ' };
  const symbol = currencySymbols[currency] || '₹';

  // Product 1 state
  const [tfFlavor, setTfFlavor] = useState('Lemon-Jeera');
  const [tfFormat, setTfFormat] = useState('sachets'); // sachets vs jar
  const [tfSubscribe, setTfSubscribe] = useState(true);

  // Product 2 state
  const [berbSubscribe, setBerbSubscribe] = useState(true);

  // Base Prices per currency
  const prices = {
    trifiber: { INR: 1199, USD: 29, AED: 99 },
    berberine: { INR: 1299, USD: 34, AED: 119 },
    bundle: { INR: 2199, USD: 54, AED: 189 }
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
    <section id="products" className="py-20 bg-white">
      <div className="container-max">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Targeted Scientific Formulations</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            The Daily Metabolic Habit Loop
          </h2>
          
          <p className="text-slate-600 text-base font-sans">
            Designed to work synergistically. Take <strong className="text-slate-900">TriFiber Daily</strong> morning or post-meal for gut volume & steady digestion, and pair with <strong className="text-slate-900">Berberine Balance</strong> for targeted cellular glucose support.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: TriFiber Daily */}
          <div className="bg-[#FAF8F5] border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative group">
            
            <div className="space-y-6">
              
              {/* Badge & Rating */}
              <div className="flex items-center justify-between">
                <span className="badge badge-emerald">Everyday Foundational</span>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 (342 reviews)</span>
                </div>
              </div>

              {/* Product Visual Mockup */}
              <div className="relative h-48 rounded-2xl bg-gradient-to-br from-emerald-900 to-slate-900 overflow-hidden flex items-center justify-center p-6 text-white group-hover:scale-[1.02] transition-transform">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="text-center space-y-2 z-10">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-serif font-bold text-2xl shadow-inner">
                    3-1
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-slate-100">TriFiber Daily</h3>
                  <p className="text-xs font-mono text-emerald-300">Lemon-Jeera Botanical Sachet</p>
                </div>
              </div>

              {/* Product Header */}
              <div>
                <h3 className="font-serif font-bold text-2xl text-slate-900">TriFiber Daily</h3>
                <p className="text-xs text-slate-500 font-medium">3-in-1 Soluble + Insoluble + Prebiotic Acacia Blend</p>
              </div>

              {/* Flavor Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">Select Flavor Profile</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTfFlavor('Lemon-Jeera')}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                      tfFlavor === 'Lemon-Jeera'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span>🍋 Lemon-Jeera</span>
                    {tfFlavor === 'Lemon-Jeera' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => setTfFlavor('Wild Citrus')}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                      tfFlavor === 'Wild Citrus'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span>🍊 Wild Citrus</span>
                    {tfFlavor === 'Wild Citrus' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                </div>
              </div>

              {/* Format Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">Packaging Format</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTfFormat('sachets')}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      tfFormat === 'sachets'
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    30 Single Sachets
                  </button>

                  <button
                    onClick={() => setTfFormat('jar')}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      tfFormat === 'jar'
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    300g Eco Jar
                  </button>
                </div>
              </div>

              {/* Actives List */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <span className="font-mono font-bold text-[10px] text-emerald-700 uppercase">Key Active Actives</span>
                <ul className="space-y-1.5 text-slate-600">
                  <li className="flex items-center justify-between">
                    <span>Oat Beta-Glucan (Standardized)</span>
                    <span className="font-mono font-bold text-slate-900">3.0g</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Prebiotic Acacia Gum</span>
                    <span className="font-mono font-bold text-slate-900">4.5g</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Resistant Starch Type 2</span>
                    <span className="font-mono font-bold text-slate-900">2.5g</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Price & Subscribe Box */}
            <div className="pt-6 space-y-4 border-t border-slate-200 mt-6">
              
              {/* Subscribe Toggle */}
              <div 
                onClick={() => setTfSubscribe(!tfSubscribe)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  tfSubscribe ? 'border-amber-400 bg-amber-50/60' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${tfSubscribe ? 'border-amber-600 bg-amber-500 text-white' : 'border-slate-300'}`}>
                    {tfSubscribe && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900">Subscribe & Save 15%</span>
                    <p className="text-[10px] text-slate-500">Auto-delivered monthly • Cancel anytime</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                  SAVE 15%
                </span>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-serif font-bold text-3xl text-slate-900">
                    {symbol}{getPrice('trifiber', tfSubscribe)}
                  </span>
                  <span className="text-sm text-slate-400 line-through ml-2 font-mono">
                    {symbol}{getCompareAt('trifiber')}
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-600 font-semibold">FSSAI Schedule VII</span>
              </div>

              <button
                onClick={() => addToCart({
                  id: 'trifiber-daily',
                  name: `TriFiber Daily (${tfFlavor})`,
                  format: tfFormat === 'sachets' ? '30 Sachets' : '300g Jar',
                  price: getPrice('trifiber', tfSubscribe),
                  symbol: symbol,
                  isSubscribe: tfSubscribe
                })}
                className="w-full btn-primary"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

            </div>

          </div>

          {/* Card 2: Berberine Balance */}
          <div className="bg-[#FAF8F5] border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative group">
            
            <div className="space-y-6">
              
              {/* Badge & Rating */}
              <div className="flex items-center justify-between">
                <span className="badge badge-gold">Targeted Botanical</span>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.85 (218 reviews)</span>
                </div>
              </div>

              {/* Product Visual Mockup */}
              <div className="relative h-48 rounded-2xl bg-gradient-to-br from-amber-950 to-slate-900 overflow-hidden flex items-center justify-center p-6 text-white group-hover:scale-[1.02] transition-transform">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="text-center space-y-2 z-10">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-serif font-bold text-xl shadow-inner">
                    97%
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-amber-100">Berberine Balance</h3>
                  <p className="text-xs font-mono text-amber-300">500mg Standardized Botanical</p>
                </div>
              </div>

              {/* Product Header */}
              <div>
                <h3 className="font-serif font-bold text-2xl text-slate-900">Berberine Balance</h3>
                <p className="text-xs text-slate-500 font-medium">Standardized Berberine HCl + Bioavailability Bio-Enhancer</p>
              </div>

              {/* Format Info */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-medium text-slate-700">
                <span>Serving Size</span>
                <span className="font-mono font-bold text-slate-900">60 Vegan Capsules (30 Days)</span>
              </div>

              {/* Actives List */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <span className="font-mono font-bold text-[10px] text-amber-700 uppercase">Key Active Ingredients</span>
                <ul className="space-y-1.5 text-slate-600">
                  <li className="flex items-center justify-between">
                    <span>Berberine HCl (Standardized 97%+)</span>
                    <span className="font-mono font-bold text-slate-900">500mg</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Piperine Bio-enhancer Extract</span>
                    <span className="font-mono font-bold text-slate-900">5mg</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>GI Tolerability Buffer Blend</span>
                    <span className="font-mono font-bold text-slate-900">50mg</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Price & Subscribe Box */}
            <div className="pt-6 space-y-4 border-t border-slate-200 mt-6">
              
              {/* Subscribe Toggle */}
              <div 
                onClick={() => setBerbSubscribe(!berbSubscribe)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  berbSubscribe ? 'border-amber-400 bg-amber-50/60' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${berbSubscribe ? 'border-amber-600 bg-amber-500 text-white' : 'border-slate-300'}`}>
                    {berbSubscribe && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900">Subscribe & Save 15%</span>
                    <p className="text-[10px] text-slate-500">Auto-delivered monthly • Cancel anytime</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                  SAVE 15%
                </span>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-serif font-bold text-3xl text-slate-900">
                    {symbol}{getPrice('berberine', berbSubscribe)}
                  </span>
                  <span className="text-sm text-slate-400 line-through ml-2 font-mono">
                    {symbol}{getCompareAt('berberine')}
                  </span>
                </div>
                <span className="text-xs font-mono text-amber-600 font-semibold">FSSAI Schedule IV</span>
              </div>

              <button
                onClick={() => addToCart({
                  id: 'berberine-balance',
                  name: 'Berberine Metabolic Balance',
                  format: '60 Vegan Capsules',
                  price: getPrice('berberine', berbSubscribe),
                  symbol: symbol,
                  isSubscribe: berbSubscribe
                })}
                className="w-full btn-gold"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

            </div>

          </div>

          {/* Card 3: Dual Habit Stack */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group md:col-span-2 lg:col-span-1">
            
            <div className="space-y-6">
              
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span className="badge bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                  Best Value Stack
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">Save 25% Total</span>
              </div>

              {/* Visual Header */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-3xl text-slate-100">The Daily Metabolic Habit Stack</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Combine TriFiber Daily and Berberine Balance for comprehensive gut-metabolic synergy.
                </p>
              </div>

              {/* Included Items List */}
              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    01
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">1x TriFiber Daily (Lemon-Jeera)</p>
                    <p className="text-[10px] text-slate-400 font-mono">30 Sachets • Satiety & SCFA blend</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xs">
                    02
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">1x Berberine Balance Capsules</p>
                    <p className="text-[10px] text-slate-400 font-mono">60 Capsules • Standardized 97% Berberine</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-emerald-300">FREE TriFiber Shaker Bottle & Habit Guide</p>
                    <p className="text-[10px] text-emerald-400/80 font-mono">Complimentary ₹499 value gift</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Price & Checkout */}
            <div className="pt-6 space-y-4 border-t border-slate-800 mt-6">
              
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-serif font-bold text-3xl text-amber-400">
                    {symbol}{prices.bundle[currency] || prices.bundle['INR']}
                  </span>
                  <span className="text-sm text-slate-500 line-through ml-2 font-mono">
                    {symbol}{Math.round((prices.bundle[currency] || prices.bundle['INR']) * 1.35)}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">Free Express Shipping</span>
              </div>

              <button
                onClick={() => addToCart({
                  id: 'daily-metabolic-stack',
                  name: 'The Daily Metabolic Habit Stack',
                  format: 'TriFiber Daily + Berberine + Shaker Bottle',
                  price: prices.bundle[currency] || prices.bundle['INR'],
                  symbol: symbol,
                  isSubscribe: true
                })}
                className="w-full btn-primary bg-gradient-to-r from-emerald-500 to-amber-500 text-slate-950 font-bold"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Get Bundle Savings</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
