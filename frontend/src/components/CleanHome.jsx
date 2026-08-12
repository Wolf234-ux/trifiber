import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2, Star } from 'lucide-react';

export default function CleanHome({ currency, addToCart, setActiveTab }) {
  const currencySymbols = { INR: '₹', USD: '$', AED: 'AED ' };
  const symbol = currencySymbols[currency] || '₹';

  return (
    <div className="space-y-16 lg:space-y-24 py-12 lg:py-20 bg-[#f5ead8]">
      
      {/* 1. HERO SECTION */}
      <section className="container-max">
        <div className="grid lg:grid-cols-12 gap-12 items-center text-left">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e1eecc] text-[#3d472b] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#7a8a5e]" />
              <span>Gut + Metabolic Health</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#201e1d]">
              Everyday nutrition for gut + metabolic health.
            </h1>

            <p className="text-[#201e1d]/75 text-lg sm:text-xl leading-relaxed max-w-xl font-sans">
              Two products. Two daily habits. One metabolic-health platform — evidence-led nutrition simple enough to actually stick.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setActiveTab('trifiber-daily')}
                className="btn btn-primary text-base px-7 py-3.5"
              >
                <span>Shop TriFiber Daily</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className="btn btn-secondary text-base px-6 py-3.5"
              >
                Take 1-Min Quiz
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#201e1d]/15">
              <div>
                <div className="font-serif text-2xl text-[#201e1d]">3-in-1</div>
                <div className="text-xs text-[#201e1d]/60 font-sans mt-0.5">Soluble · insoluble · prebiotic</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-[#201e1d]">500 mg</div>
                <div className="text-xs text-[#201e1d]/60 font-sans mt-0.5">Standardized berberine target</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-[#201e1d]">Batch-level</div>
                <div className="text-xs text-[#201e1d]/60 font-sans mt-0.5">QR-linked Eurofins/SGS data</div>
              </div>
            </div>

          </div>

          {/* Right Hero Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#ebddc5] border border-[#201e1d]/10 rounded-[36px] p-8 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="tag tag-accent">Daily Ritual</span>
                <span className="text-xs font-mono font-semibold text-[#7a8a5e]">FSSAI Schedule VII</span>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-2xl text-[#201e1d]">The Dual Metabolic Routine</h3>
                <p className="text-xs text-[#201e1d]/70 leading-relaxed">
                  Combining oat beta-glucan satiety modulation with high-purity berberine HCl for round-the-clock metabolic wellness.
                </p>
              </div>

              <div className="bg-[#f5ead8] rounded-2xl p-4 border border-[#201e1d]/10 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-[#201e1d]">
                  <CheckCircle2 className="w-4 h-4 text-[#c67139] shrink-0" />
                  <span><strong>Morning:</strong> 1 scoop TriFiber Daily (Lemon-Jeera)</span>
                </div>
                <div className="flex items-center gap-2 text-[#201e1d]">
                  <CheckCircle2 className="w-4 h-4 text-[#7a8a5e] shrink-0" />
                  <span><strong>Pre-Meal:</strong> 1 capsule Berberine Balance</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs font-mono text-[#201e1d]/60">Verified third-party testing</div>
                <button
                  onClick={() => setActiveTab('batch')}
                  className="btn btn-ghost text-xs font-semibold"
                >
                  Verify Batch QA &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. PRODUCT RANGE SHOWCASE (2 CARDS ONLY) */}
      <section className="container-max text-left space-y-12">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="tag tag-accent-2 mb-3">The Range</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#201e1d]">
              Two products. One daily habit loop.
            </h2>
          </div>
          <p className="text-xs text-[#201e1d]/60 font-mono max-w-xs">
            Formulated to work synergistically for gut volume & glucose metabolism.
          </p>
        </div>

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
                  <CheckCircle2 className="w-4 h-4 text-[#c67139]" />
                  <span>3.0g Standardized Oat Beta-Glucan</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#c67139]" />
                  <span>4.5g Prebiotic Acacia Fiber</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#c67139]" />
                  <span>2.5g Resistant Starch Blend</span>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-[#201e1d]/10 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#201e1d]">
                  {symbol}{currency === 'USD' ? 29 : currency === 'AED' ? 99 : 1199}
                </span>
                <span className="text-xs text-[#201e1d]/60 font-sans">
                  / month on subscription
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => addToCart({
                    id: 'trifiber-daily',
                    name: 'TriFiber Daily',
                    flavor: 'Lemon-Jeera',
                    format: '30 Single-Serve Sachets',
                    price: currency === 'USD' ? 29 : currency === 'AED' ? 99 : 1199
                  })}
                  className="btn btn-primary flex-1 py-3"
                >
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
                  <CheckCircle2 className="w-4 h-4 text-[#7a8a5e]" />
                  <span>500mg Pure Berberine HCl (97%+ Assay)</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#7a8a5e]" />
                  <span>5mg Piperine Bio-Enhancer Extract</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#7a8a5e]" />
                  <span>FSSAI Schedule IV Botanical Clearance</span>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-[#7a8a5e]/20 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#201e1d]">
                  {symbol}{currency === 'USD' ? 34 : currency === 'AED' ? 119 : 1299}
                </span>
                <span className="text-xs text-[#201e1d]/60 font-sans">
                  / month on subscription
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => addToCart({
                    id: 'berberine-balance',
                    name: 'Berberine Metabolic Balance',
                    flavor: 'Unflavored Capsules',
                    format: '60 Vegan Capsules',
                    price: currency === 'USD' ? 34 : currency === 'AED' ? 119 : 1299
                  })}
                  className="btn btn-primary flex-1 py-3"
                >
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
      </section>

      {/* 3. SCIENCE TEASER STRIP */}
      <section className="container-max text-left">
        <div className="bg-[#ebddc5] border border-[#201e1d]/10 rounded-[32px] p-8 lg:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#201e1d]/10 pb-6">
            <div>
              <span className="tag tag-accent mb-2">Evidence-Led Rationale</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#201e1d]">Why Fiber & Botanical Science Matter</h3>
            </div>
            <button
              onClick={() => setActiveTab('why-fiber')}
              className="btn btn-secondary text-xs py-2 px-4"
            >
              Read Full Science Specs &rarr;
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <h4 className="font-serif text-lg text-[#201e1d]">1. Viscous Satiety Matrix</h4>
              <p className="text-xs text-[#201e1d]/75 leading-relaxed">
                Oat Beta-Glucan absorbs liquid to slow carbohydrate gastric clearance, reducing 3 PM sugar spikes.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-lg text-[#201e1d]">2. Prebiotic SCFA Fuel</h4>
              <p className="text-xs text-[#201e1d]/75 leading-relaxed">
                Acacia and Resistant Starch ferment in the distal colon to feed beneficial <i>Bifidobacteria</i>.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-lg text-[#201e1d]">3. AMPK Activation</h4>
              <p className="text-xs text-[#201e1d]/75 leading-relaxed">
                Standardized Berberine HCl activates the cellular metabolic switch for steady glucose uptake.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
