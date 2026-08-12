import React from 'react';
import { Sparkles, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export default function WhyFiberScience({ setActiveTab }) {
  return (
    <div className="py-16 bg-[#f5ead8]">
      <div className="container-max space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff2eb] text-[#8c491a] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#c67139]" />
            <span>Evidence-Led Clinical Rationale</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#201e1d] leading-tight">
            Why Fiber Is the Missing Pillar of Everyday Metabolic Health.
          </h1>
          <p className="text-lg text-[#201e1d]/75 font-sans leading-relaxed">
            Over 95% of modern adults fall far short of the recommended 30g daily fiber target. This "fiber gap" directly contributes to post-meal glucose volatility, afternoon energy slumps, and microbial dysbiosis.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="bg-[#ebddc5] border border-[#201e1d]/10 rounded-3xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#c67139] text-[#f5ead8] flex items-center justify-center font-serif text-xl font-bold">
              1
            </div>
            <h3 className="font-serif text-2xl text-[#201e1d]">Viscous Satiety Matrix</h3>
            <p className="text-sm text-[#201e1d]/75 leading-relaxed">
              Soluble Oat Beta-Glucan absorbs water in the upper GI tract, forming a high-viscosity matrix that slows gastric emptying and moderates blood glucose entry into circulation.
            </p>
          </div>

          <div className="bg-[#e1eecc] border border-[#7a8a5e]/20 rounded-3xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#7a8a5e] text-[#f5ead8] flex items-center justify-center font-serif text-xl font-bold">
              2
            </div>
            <h3 className="font-serif text-2xl text-[#201e1d]">Colonic SCFA Fermentation</h3>
            <p className="text-sm text-[#201e1d]/75 leading-relaxed">
              Prebiotic Acacia Fiber and Resistant Starch bypass early digestion to reach the distal colon, serving as fuel for <i>Bifidobacteria</i> to synthesize Acetate, Propionate, and Butyrate.
            </p>
          </div>

          <div className="bg-[#ebddc5] border border-[#201e1d]/10 rounded-3xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#201e1d] text-[#f5ead8] flex items-center justify-center font-serif text-xl font-bold">
              3
            </div>
            <h3 className="font-serif text-2xl text-[#201e1d]">AMPK Metabolic Balance</h3>
            <p className="text-sm text-[#201e1d]/75 leading-relaxed">
              Standardized Berberine HCl activates the AMP-activated protein kinase pathway — often called the cellular metabolic master switch — supporting glucose uptake independently of insulin.
            </p>
          </div>

        </div>

        {/* Post GLP-1 Era Feature */}
        <div className="bg-[#201e1d] text-[#f5ead8] rounded-[36px] p-10 md:p-14 space-y-6">
          <span className="tag tag-accent text-xs">Clinical Perspective</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f5ead8] leading-snug max-w-2xl">
            Designed for Long-Term Habits in the Post-GLP-1 Era.
          </h2>
          <p className="text-[#f5ead8]/80 text-base max-w-3xl leading-relaxed">
            As GLP-1 receptor agonist adoption accelerates, maintaining lean muscle mass, gut motility, and foundational SCFA production is essential. TriFiber Health delivers evidence-led daily nutritional foundation to prevent post-medication rebound and build sustainable metabolic resilience.
          </p>
          
          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('trifiber-daily')}
              className="btn btn-primary px-6 py-3"
            >
              Shop TriFiber Daily
            </button>
            <button
              onClick={() => setActiveTab('berberine-balance')}
              className="btn btn-secondary !border-[#f5ead8]/30 !text-[#f5ead8] hover:!bg-[#f5ead8]/10 px-6 py-3"
            >
              Shop Berberine Balance
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
