import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2, Star, Brain, Activity, Clock, Zap, Microscope, Award, FileText } from 'lucide-react';
import GlucoseCurveSimulator from './GlucoseCurveSimulator';
import FormulaExplodedView from './FormulaExplodedView';
import MilestoneTimeline from './MilestoneTimeline';

export default function CleanHome({ currency, addToCart, setActiveTab }) {
  const currencySymbols = { INR: '₹', USD: '$', AED: 'AED ' };
  const symbol = currencySymbols[currency] || '₹';

  const [activeInteractiveTab, setActiveInteractiveTab] = useState('glucose'); // 'glucose', 'formula', 'timeline'

  return (
    <div className="space-y-16 lg:space-y-24 py-10 lg:py-16 bg-[#f5ead8]">
      
      {/* 1. HERO: WHY YOU HAVE COME HERE & WHAT WE PROVIDE */}
      <section className="container-max">
        <div className="grid lg:grid-cols-12 gap-12 items-center text-left">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e1eecc] text-[#3d472b] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#7a8a5e]" />
              <span>Evidence-Led Everyday Nutrition</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#201e1d]">
              Close the fiber gap. Balance your daily glucose & gut health.
            </h1>

            <p className="text-[#201e1d]/75 text-lg sm:text-xl leading-relaxed max-w-xl font-sans">
              95% of modern adults fall far short of the 30g daily fiber target, leading to post-meal glucose spikes, 3 PM energy crashes, and poor gut motility. We provide evidence-led, clinical daily nutrition engineered to make metabolic balance effortless.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setActiveTab('trifiber-daily')}
                className="btn btn-primary text-base px-7 py-3.5 flex items-center gap-2"
              >
                <span>Shop Daily Protocol</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className="btn btn-secondary text-base px-6 py-3.5"
              >
                Calculate Your Fiber Gap (1-Min)
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#201e1d]/15">
              <div>
                <div className="font-serif text-2xl text-[#201e1d]">3-in-1</div>
                <div className="text-xs text-[#201e1d]/60 font-sans mt-0.5">Soluble · Insoluble · Prebiotic</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-[#201e1d]">500 mg</div>
                <div className="text-xs text-[#201e1d]/60 font-sans mt-0.5">Standardized Berberine Target</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-[#201e1d]">100% Clean</div>
                <div className="text-xs text-[#201e1d]/60 font-sans mt-0.5">QR-linked Eurofins Lab Reports</div>
              </div>
            </div>

          </div>

          {/* Right Hero Card: The 2-Step Routine Summary */}
          <div className="lg:col-span-5">
            <div className="bg-[#ebddc5] border border-[#201e1d]/15 rounded-[36px] p-8 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="tag tag-accent">What We Provide</span>
                <span className="text-xs font-mono font-semibold text-[#7a8a5e]">FSSAI Certified</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-[#201e1d]">The Dual Metabolic Routine</h3>
                <p className="text-xs sm:text-sm text-[#201e1d]/70 leading-relaxed font-sans">
                  A synergistic morning & pre-meal system engineered to sustain fullness, flatten post-prandial glucose curves, and nourish your gut microbiome.
                </p>
              </div>

              <div className="bg-[#f5ead8] rounded-2xl p-4 border border-[#201e1d]/10 space-y-3 text-xs">
                <div className="flex items-start gap-2.5 text-[#201e1d]">
                  <CheckCircle2 className="w-4 h-4 text-[#c67139] shrink-0 mt-0.5" />
                  <div>
                    <strong>Morning Habit:</strong> 1 scoop TriFiber Daily in water (Lemon-Jeera botanical blend)
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-[#201e1d]">
                  <CheckCircle2 className="w-4 h-4 text-[#7a8a5e] shrink-0 mt-0.5" />
                  <div>
                    <strong>Pre-Meal Habit:</strong> 1 capsule Berberine Balance before your main carbohydrate meal
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs font-mono text-[#201e1d]/60">Verified pure ingredients</div>
                <button
                  onClick={() => setActiveTab('batch')}
                  className="btn btn-ghost text-xs font-semibold"
                >
                  Inspect Batch Lab CoA &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. THE 3 REASONS YOU NEED TRIFIBER (ORTHODOX VALUE PILLARS) */}
      <section className="container-max text-left space-y-8">
        <div className="space-y-2">
          <span className="tag tag-accent-2 text-xs">The Problem & The Solution</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#201e1d]">
            Why Modern Diets Fail Your Metabolic Health
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="bg-[#ebddc5] border border-[#201e1d]/10 rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c67139] text-[#f5ead8] flex items-center justify-center font-serif text-lg font-bold">
              1
            </div>
            <h3 className="font-serif text-xl text-[#201e1d]">The 15g Daily Fiber Deficit</h3>
            <p className="text-xs sm:text-sm text-[#201e1d]/75 leading-relaxed font-sans">
              Ultra-processed and refined foods lack fermentable fibers. Without them, beneficial gut microbes (*Akkermansia* & *Bifidobacteria*) starve, causing bloating, sluggish motility, and reduced mucosal barrier strength.
            </p>
          </div>

          <div className="bg-[#ebddc5] border border-[#201e1d]/10 rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#7a8a5e] text-[#f5ead8] flex items-center justify-center font-serif text-lg font-bold">
              2
            </div>
            <h3 className="font-serif text-xl text-[#201e1d]">3 PM Sugar Spikes & Crashes</h3>
            <p className="text-xs sm:text-sm text-[#201e1d]/75 leading-relaxed font-sans">
              Fast-digesting refined carbs cause sharp blood sugar spikes followed by steep reactive drops. This triggers midday fatigue, brain fog, and intense late-afternoon sugar cravings.
            </p>
          </div>

          <div className="bg-[#ebddc5] border border-[#201e1d]/10 rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#201e1d] text-[#f5ead8] flex items-center justify-center font-serif text-lg font-bold">
              3
            </div>
            <h3 className="font-serif text-xl text-[#201e1d]">The Post-GLP-1 Era Challenge</h3>
            <p className="text-xs sm:text-sm text-[#201e1d]/75 leading-relaxed font-sans">
              Preserving gut motility, lean muscle, and natural endogenous satiety signaling requires consistent prebiotic fiber and standardized AMPK metabolic support to prevent post-medication rebound.
            </p>
          </div>

        </div>
      </section>

      {/* 3. WHAT WE PROVIDE: THE PRODUCT LINEUP */}
      <section className="container-max text-left space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="tag tag-accent mb-2">The Product Portfolio</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#201e1d]">
              Two Targeted Formulas. One Daily Habit.
            </h2>
          </div>
          <p className="text-xs text-[#201e1d]/60 font-mono max-w-xs">
            Evidence-led ingredients at full therapeutic clinical dosages.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Product 1: TriFiber Daily */}
          <div className="bg-[#ebddc5] border border-[#201e1d]/15 rounded-[32px] p-8 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-6">
              
              <div className="flex items-start justify-between">
                <span className="tag tag-accent">Morning Habit</span>
                <span className="text-xs font-mono font-semibold text-[#c67139]">Lemon-Jeera Flavor</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-3xl text-[#201e1d]">TriFiber Daily</h3>
                <p className="text-sm text-[#201e1d]/75 leading-relaxed font-sans">
                  A light, refreshing 3-in-1 multi-fiber drink combining Swedish Oat Beta-Glucan, Acacia Fibregum™, and Resistant Starch. Zero psyllium sludge, zero bloating.
                </p>
              </div>

              <div className="bg-[#f5ead8] rounded-2xl p-4 border border-[#201e1d]/10 space-y-2 text-xs text-[#201e1d]">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#c67139]" />
                  <span>3.0g Standardized Oat Beta-Glucan (Glucose Shield)</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#c67139]" />
                  <span>4.5g Prebiotic Acacia Fibregum™ (SCFA Producer)</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#c67139]" />
                  <span>2.5g Resistant Tapioca Starch (Colonic Motility)</span>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-[#201e1d]/10 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#201e1d]">
                  {symbol}{currency === 'USD' ? 29 : currency === 'AED' ? 99 : 1199}
                </span>
                <span className="text-xs text-[#201e1d]/60 font-sans">
                  / 30-day supply (30 single-serve sachets)
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
          <div className="bg-[#f0fae1] border border-[#7a8a5e]/25 rounded-[32px] p-8 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-6">
              
              <div className="flex items-start justify-between">
                <span className="tag tag-accent-2">Pre-Meal Habit</span>
                <span className="text-xs font-mono font-semibold text-[#7a8a5e]">97%+ Pure HPLC</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-3xl text-[#201e1d]">Berberine Balance</h3>
                <p className="text-sm text-[#201e1d]/75 leading-relaxed font-sans">
                  High-purity standardized Berberine HCl (500mg) paired with Piperine for superior gastrointestinal bioavailability and cellular AMPK metabolic pathway activation.
                </p>
              </div>

              <div className="bg-[#f5ead8] rounded-2xl p-4 border border-[#201e1d]/10 space-y-2 text-xs text-[#201e1d]">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#7a8a5e]" />
                  <span>500mg Pure Standardized Berberine HCl</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#7a8a5e]" />
                  <span>5mg Piperine Extract (Bio-availability enhancer)</span>
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
                  / 30-day supply (60 vegan capsules)
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

      {/* 4. INTERACTIVE PROOF & SCIENCE SPOTLIGHT (CLEAN TABBED CONTAINER) */}
      <section className="container-max text-left space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="tag tag-accent text-xs">Scientific Spotlight</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#201e1d]">
              Explore the Physiological Proof
            </h2>
          </div>

          {/* Clean Segmented Tab Switcher */}
          <div className="flex items-center gap-2 bg-[#ebddc5] p-1.5 rounded-2xl border border-[#201e1d]/10 self-start sm:self-auto shrink-0 shadow-sm">
            <button
              onClick={() => setActiveInteractiveTab('glucose')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeInteractiveTab === 'glucose'
                  ? 'bg-[#201e1d] text-[#f5ead8] shadow-sm'
                  : 'text-[#201e1d]/70 hover:text-[#201e1d]'
              }`}
            >
              📈 Glucose Simulator
            </button>
            <button
              onClick={() => setActiveInteractiveTab('formula')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeInteractiveTab === 'formula'
                  ? 'bg-[#201e1d] text-[#f5ead8] shadow-sm'
                  : 'text-[#201e1d]/70 hover:text-[#201e1d]'
              }`}
            >
              🧬 Formula Breakdown
            </button>
            <button
              onClick={() => setActiveInteractiveTab('timeline')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeInteractiveTab === 'timeline'
                  ? 'bg-[#201e1d] text-[#f5ead8] shadow-sm'
                  : 'text-[#201e1d]/70 hover:text-[#201e1d]'
              }`}
            >
              ⏱️ 90-Day Timeline
            </button>
          </div>
        </div>

        {/* Dynamic Display of Selected Interactive Module */}
        <div className="rounded-[32px] overflow-hidden border border-[#201e1d]/10">
          {activeInteractiveTab === 'glucose' && (
            <GlucoseCurveSimulator setActiveTab={setActiveTab} />
          )}
          {activeInteractiveTab === 'formula' && (
            <FormulaExplodedView setActiveTab={setActiveTab} />
          )}
          {activeInteractiveTab === 'timeline' && (
            <MilestoneTimeline setActiveTab={setActiveTab} />
          )}
        </div>

      </section>

      {/* 5. RADICAL TRANSPARENCY & BATCH LAB PROMISE */}
      <section className="container-max text-left">
        <div className="bg-[#ebddc5] border border-[#201e1d]/10 rounded-[32px] p-8 lg:p-12 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#201e1d]/10 pb-6">
            <div className="space-y-1">
              <span className="tag tag-accent-2 text-xs">Quality Assurance</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#201e1d]">
                100% Batch Purity & Lab Transparency
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('batch')}
              className="btn btn-secondary text-xs py-2.5 px-5 flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-[#c67139]" />
              <span>Verify Any Batch CoA &rarr;</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-[#201e1d]/75 max-w-3xl leading-relaxed font-sans">
            Every production batch is tested by accredited third-party labs (Eurofins & SGS) for heavy metal purity (&lt;0.005 ppm), active beta-glucan assay, and zero microbial contaminants. Scan the QR code on your product box to review your specific Certificate of Analysis.
          </p>
        </div>
      </section>

    </div>
  );
}
