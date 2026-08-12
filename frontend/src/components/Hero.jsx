import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Hero({ setActiveTab }) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-[#f5ead8]">
      <div className="container-max">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e1eecc] text-[#3d472b] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#7a8a5e]" />
              <span>Gut + Metabolic Nutrition</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#201e1d]">
              Everyday nutrition for gut + metabolic health.
            </h1>

            <p className="text-[#201e1d]/75 text-lg sm:text-xl leading-relaxed max-w-xl font-sans">
              Two products. Two daily habits. One metabolic-health platform — evidence-led nutrition simple enough to actually stick.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setActiveTab('trifiber-daily')}
                className="btn btn-primary text-base px-6 py-3"
              >
                <span>Shop TriFiber Daily</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('why-fiber')}
                className="btn btn-secondary text-base px-6 py-3"
              >
                Why Fiber & Science
              </button>
            </div>

            {/* Key Pillars */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#201e1d]/15">
              <div>
                <div className="font-serif text-2xl text-[#201e1d]">3-in-1</div>
                <div className="text-xs text-[#201e1d]/60 font-sans mt-0.5">Soluble · insoluble · prebiotic</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-[#201e1d]">500 mg</div>
                <div className="text-xs text-[#201e1d]/60 font-sans mt-0.5">Standardized berberine HCl</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-[#201e1d]">Batch-level</div>
                <div className="text-xs text-[#201e1d]/60 font-sans mt-0.5">QR-linked test data</div>
              </div>
            </div>

          </div>

          {/* Right Hero Card / Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-[#ebddc5] rounded-[36px] p-8 border border-[#201e1d]/10 shadow-md space-y-6">
              
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
                <div className="text-xs font-mono text-[#201e1d]/60">Verified eurofins & SGS batch QA</div>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="btn btn-ghost text-xs underline font-semibold"
                >
                  Take 1-Min Quiz &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
