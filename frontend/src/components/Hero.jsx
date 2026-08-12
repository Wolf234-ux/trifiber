import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Activity, Flame, CheckCircle2 } from 'lucide-react';

export default function Hero({ setActiveTab }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-[#F9F7F2] via-[#FAF8F5] to-[#F1ECE2]">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-35 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/10 border border-emerald-800/20 text-emerald-900 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>The Everyday Post-GLP-1 Metabolic Habit</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] tracking-tight">
              Better Gut. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600">
                Better Metabolism.
              </span> <br />
              Every Day.
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl font-sans leading-relaxed">
              TriFiber Health bridges the gap between low-compliance legacy fiber supplements and high-barrier prescription GLP-1 medications — delivering evidence-led, 3-in-1 multi-fiber drinks & standardized botanicals for daily satiety and post-meal glucose stability.
            </p>

            {/* Feature Highlights Pills */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>3-in-1 Multi-Fiber Blend</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Bloat & Lemon-Jeera Flavor</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>FSSAI & Eurofins Lab Tested</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setActiveTab('products')}
                className="btn-primary"
              >
                <span>Explore Formulas</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className="btn-secondary"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Take 60s Metabolic Assessment</span>
              </button>
            </div>

          </div>

          {/* Right Column: Glassmorphic Clinical Metric Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              
              {/* Main Dark Glass Card */}
              <div className="glass-dark rounded-3xl p-8 text-white space-y-6 relative overflow-hidden border border-slate-700/60 shadow-2xl">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-emerald-400 tracking-wider font-semibold">Clinical Proof Matrix</span>
                    <h3 className="font-serif text-xl font-bold text-slate-100">Metabolic Response Profile</h3>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>

                {/* Metric 1 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      Post-Meal Glucose Fluctuation
                    </span>
                    <span className="font-mono font-bold text-emerald-400">-38% Modulation</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-amber-400 h-2 rounded-full w-[78%]" />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Colonic Short-Chain Fatty Acids (SCFA)
                    </span>
                    <span className="font-mono font-bold text-emerald-400">+65% Gut Diversity</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-400 h-2 rounded-full w-[85%]" />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Natural Satiety Window</span>
                    <span className="font-mono font-bold text-amber-400">4.2 Hours Post-Scoop</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-400 h-2 rounded-full w-[90%]" />
                  </div>
                </div>

                {/* Batch Verification Pill */}
                <div className="pt-2">
                  <div 
                    onClick={() => setActiveTab('batch')}
                    className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs cursor-pointer hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-mono text-slate-300">Live Batch: TFH-2026-B001</span>
                    </div>
                    <span className="text-emerald-400 font-semibold underline">Verify COA</span>
                  </div>
                </div>

              </div>

              {/* Floating Floating Stat Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3 animate-float hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold font-serif">
                  4.9★
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">340+ Verified Reviews</p>
                  <p className="text-[11px] text-slate-500 font-mono">Lemon-Jeera Botanical Blend</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
