import React, { useState } from 'react';
import { ShoppingBag, Check, ShieldCheck, Sparkles, RefreshCw, Zap, Star } from 'lucide-react';

export default function TriFiberDailyPage({ currency, addToCart, setActiveTab }) {
  const currencySymbols = { INR: '₹', USD: '$', AED: 'AED ' };
  const symbol = currencySymbols[currency] || '₹';

  const [format, setFormat] = useState('sachets'); // sachets vs jar
  const [isSubscribe, setIsSubscribe] = useState(true);

  const basePrice = { INR: 1199, USD: 29, AED: 99 }[currency] || 1199;
  const price = isSubscribe ? Math.round(basePrice * 0.85) : basePrice;
  const compareAt = Math.round(basePrice * 1.25);

  const productData = {
    id: 'trifiber-daily',
    name: 'TriFiber Daily',
    tagline: 'Daily Multi-Fiber Drink for Gut & Metabolic Health',
    flavor: 'Lemon-Jeera (Refreshing Indian Botanical)',
    format: format === 'sachets' ? '30 Single-Serve Sachets' : '300g Bulk Tub / Jar',
    pricing: { INR: { price: price } }
  };

  return (
    <div className="py-12 bg-white text-left">
      <div className="container-max">
        
        {/* Breadcrumb */}
        <div className="text-xs font-mono text-slate-500 mb-6 flex items-center gap-2">
          <button onClick={() => setActiveTab('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-orange-600 font-bold">TriFiber Daily</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Visual / Image Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-8 text-center space-y-6 shadow-sm">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-800 text-xs font-semibold border border-orange-200">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>Broad-Entry Satiety Foundation</span>
              </div>

              <div className="py-8 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center space-y-3 shadow-sm">
                <div className="w-24 h-24 rounded-full bg-orange-50 text-orange-600 font-heading text-3xl font-bold flex items-center justify-center border border-orange-200">
                  3-in-1
                </div>
                <h3 className="font-heading text-2xl font-bold text-slate-900">TriFiber Daily Mix</h3>
                <p className="text-xs font-mono text-emerald-700 font-semibold">Refreshing Lemon-Jeera Botanical Drink</p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center border-t border-slate-200 pt-6">
                <div>
                  <div className="font-heading text-xl font-bold text-slate-900">3.0g</div>
                  <div className="text-[11px] text-slate-500 font-sans">Oat Beta-Glucan</div>
                </div>
                <div>
                  <div className="font-heading text-xl font-bold text-slate-900">4.5g</div>
                  <div className="text-[11px] text-slate-500 font-sans">Prebiotic Acacia</div>
                </div>
                <div>
                  <div className="font-heading text-xl font-bold text-slate-900">2.5g</div>
                  <div className="text-[11px] text-slate-500 font-sans">Resistant Starch</div>
                </div>
              </div>

            </div>

            {/* FSSAI & Quality Badge */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 text-left space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>FSSAI Schedule VII Compliant</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed font-sans">
                Formulated strictly under FSSAI Schedule VII for Prebiotic Dietary Fibers. Every batch undergoes Eurofins analytical verification for beta-glucan assay and heavy metal clearance.
              </p>
            </div>
          </div>

          {/* Right Column: Buying Options & Details */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>4.9 / 5.0</span>
                </div>
                <span className="text-xs text-slate-500">(342 Verified Customer Reviews)</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                TriFiber Daily
              </h1>
              
              <p className="text-slate-600 text-base leading-relaxed font-sans">
                Engineered 3-in-1 dietary fiber drink mix combining soluble fiber, insoluble fiber, and prebiotic acacia. Designed to close the modern fiber gap without bloat or psyllium sludge.
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
                <span className="tag tag-accent text-xs font-bold font-mono">Save 15% VIP</span>
              </div>

              {/* Format Selector */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-xs font-semibold text-slate-700">Select Packaging Format:</div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormat('sachets')}
                    className={`p-3 rounded-xl border text-xs font-sans text-left transition-all ${
                      format === 'sachets'
                        ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-500/20 font-bold text-slate-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div>30 Sachets (Travel-Ready)</div>
                    <div className="text-[10px] text-slate-400 font-normal">Single-Serve Daily Portions</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormat('jar')}
                    className={`p-3 rounded-xl border text-xs font-sans text-left transition-all ${
                      format === 'jar'
                        ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-500/20 font-bold text-slate-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div>300g Tub / Jar</div>
                    <div className="text-[10px] text-slate-400 font-normal">Home Countertop Ritual</div>
                  </button>
                </div>
              </div>

              {/* Purchase Mode Toggle */}
              <div className="space-y-2 pt-2">
                <div
                  onClick={() => setIsSubscribe(true)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    isSubscribe
                      ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-500/20'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="text-xs">
                    <div className="font-bold text-slate-900">Subscribe & Save (Recommended)</div>
                    <div className="text-slate-500 text-[11px]">Free delivery every 30 days. Pause or cancel anytime.</div>
                  </div>
                  <div className="font-heading text-sm font-bold text-orange-600">{symbol}{price}</div>
                </div>

                <div
                  onClick={() => setIsSubscribe(false)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    !isSubscribe
                      ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-500/20'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="text-xs">
                    <div className="font-bold text-slate-900">One-Time Purchase</div>
                    <div className="text-slate-500 text-[11px]">Single 30-day supply.</div>
                  </div>
                  <div className="font-heading text-sm font-bold text-slate-900">{symbol}{basePrice}</div>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={() => addToCart({
                  id: 'trifiber-daily',
                  name: 'TriFiber Daily',
                  flavor: 'Lemon-Jeera',
                  format: format === 'sachets' ? '30 Single-Serve Sachets' : '300g Jar',
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
