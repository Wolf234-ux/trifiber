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
    <div className="py-12 bg-[#f5ead8]">
      <div className="container-max">
        
        {/* Breadcrumb */}
        <div className="text-xs font-mono text-[#201e1d]/60 mb-6 flex items-center gap-2">
          <button onClick={() => setActiveTab('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-[#c67139] font-bold">TriFiber Daily</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Visual / Image Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#ebddc5] border border-[#201e1d]/10 rounded-[32px] p-8 text-center space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff2eb] text-[#8c491a] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#c67139]" />
                <span>Broad-Entry Satiety Foundation</span>
              </div>

              <div className="py-8 bg-[#f5ead8] rounded-2xl border border-[#201e1d]/10 flex flex-col items-center justify-center space-y-3">
                <div className="w-24 h-24 rounded-full bg-[#c67139]/15 flex items-center justify-center text-[#c67139] font-serif text-3xl font-bold">
                  3-in-1
                </div>
                <h3 className="font-serif text-2xl text-[#201e1d]">TriFiber Daily Mix</h3>
                <p className="text-xs font-mono text-[#7a8a5e]">Refreshing Lemon-Jeera Botanical Drink</p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center border-t border-[#201e1d]/10 pt-6">
                <div>
                  <div className="font-serif text-xl text-[#201e1d]">3.0g</div>
                  <div className="text-[11px] text-[#201e1d]/60 font-sans">Oat Beta-Glucan</div>
                </div>
                <div>
                  <div className="font-serif text-xl text-[#201e1d]">4.5g</div>
                  <div className="text-[11px] text-[#201e1d]/60 font-sans">Prebiotic Acacia</div>
                </div>
                <div>
                  <div className="font-serif text-xl text-[#201e1d]">2.5g</div>
                  <div className="text-[11px] text-[#201e1d]/60 font-sans">Resistant Starch</div>
                </div>
              </div>

            </div>

            {/* FSSAI & Quality Badge */}
            <div className="bg-[#e1eecc] border border-[#7a8a5e]/20 rounded-2xl p-6 text-left space-y-2">
              <div className="flex items-center gap-2 text-[#3d472b] font-semibold text-sm">
                <ShieldCheck className="w-5 h-5 text-[#7a8a5e]" />
                <span>FSSAI Schedule VII Compliant</span>
              </div>
              <p className="text-xs text-[#3d472b]/80 leading-relaxed">
                Formulated strictly under FSSAI Schedule VII for Prebiotic Dietary Fibers. Every batch undergoes Eurofins analytical verification for beta-glucan assay and heavy metal clearance.
              </p>
            </div>
          </div>

          {/* Right Column: Buying Options & Details */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-amber-600 text-xs font-bold gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>4.9 / 5.0</span>
                </div>
                <span className="text-xs text-[#201e1d]/50">(342 Verified Customer Reviews)</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#201e1d] mb-2">
                TriFiber Daily
              </h1>
              
              <p className="text-[#201e1d]/75 text-base">
                Engineered 3-in-1 dietary fiber drink mix combining soluble fiber, insoluble fiber, and prebiotic acacia. Designed to close the modern fiber gap without bloat or psyllium sludge.
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
                  <span className="tag tag-accent text-xs">Save 15% Subscription</span>
                )}
              </div>

              {/* Purchase Options Toggle */}
              <div className="space-y-3">
                <label 
                  onClick={() => setIsSubscribe(true)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${isSubscribe ? 'border-[#c67139] bg-[#fff2eb]' : 'border-[#201e1d]/15 bg-[#f5ead8]'}`}
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={isSubscribe} readOnly className="accent-[#c67139]" />
                    <div>
                      <div className="text-sm font-bold text-[#201e1d]">Subscribe & Save 15%</div>
                      <div className="text-xs text-[#201e1d]/60">Delivered monthly. Cancel or skip anytime.</div>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#c67139]">{symbol}{price}</span>
                </label>

                <label 
                  onClick={() => setIsSubscribe(false)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${!isSubscribe ? 'border-[#c67139] bg-[#fff2eb]' : 'border-[#201e1d]/15 bg-[#f5ead8]'}`}
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={!isSubscribe} readOnly className="accent-[#c67139]" />
                    <div>
                      <div className="text-sm font-bold text-[#201e1d]">One-Time Purchase</div>
                      <div className="text-xs text-[#201e1d]/60">Single pack purchase without subscription.</div>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#201e1d]">{symbol}{basePrice}</span>
                </label>
              </div>

              {/* Format Selector */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-[#201e1d]/70 block mb-2">Select Packaging Format:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFormat('sachets')}
                    className={`py-2 px-4 rounded-full text-xs font-semibold border transition-all ${format === 'sachets' ? 'bg-[#c67139] text-[#f5ead8] border-[#c67139]' : 'border-[#201e1d]/20 text-[#201e1d]'}`}
                  >
                    30 Sachets (Travel Friendly)
                  </button>
                  <button
                    onClick={() => setFormat('jar')}
                    className={`py-2 px-4 rounded-full text-xs font-semibold border transition-all ${format === 'jar' ? 'bg-[#c67139] text-[#f5ead8] border-[#c67139]' : 'border-[#201e1d]/20 text-[#201e1d]'}`}
                  >
                    300g Jar (Home Scoop)
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart({ ...productData, price: price })}
                className="btn btn-primary w-full text-base py-3.5 mt-4"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add TriFiber Daily to Cart ({symbol}{price})</span>
              </button>
            </div>

            {/* Benefits Bullet Points */}
            <div className="space-y-3 pt-2 text-sm text-[#201e1d]/80">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#c67139] shrink-0 mt-1" />
                <span><strong>Post-Meal Glucose Modulation:</strong> Oat Beta-Glucan forms a viscosity gel in the stomach, slowing carbohydrate absorption and attenuating sugar spikes.</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#c67139] shrink-0 mt-1" />
                <span><strong>Micronized Prebiotic Acacia:</strong> Feeds beneficial <i>Bifidobacteria</i> and <i>Akkermansia</i> for short-chain fatty acid (SCFA) synthesis.</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#c67139] shrink-0 mt-1" />
                <span><strong>Refreshing Taste:</strong> Zesty Indian Lemon-Jeera botanical notes. Zero medicinal aftertaste, non-clumping.</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
