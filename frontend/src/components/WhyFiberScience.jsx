import React from 'react';
import { Sparkles, ShieldCheck, ArrowRight, Zap, CheckCircle2, Microscope, Brain, Activity } from 'lucide-react';
import GlucoseCurveSimulator from './GlucoseCurveSimulator';
import FormulaExplodedView from './FormulaExplodedView';
import GutBrainSynapseMap from './GutBrainSynapseMap';

export default function WhyFiberScience({ setActiveTab }) {
  return (
    <div className="py-12 lg:py-16 bg-white space-y-16">
      <div className="container-max space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-800 text-xs font-semibold border border-orange-200">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Evidence-Led Clinical Rationale</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Why Fiber Is the Missing Pillar of Everyday Metabolic Health.
          </h1>
          <p className="text-lg text-slate-600 font-sans leading-relaxed">
            Over 95% of modern adults fall far short of the recommended 30g daily fiber target. This "fiber gap" directly contributes to post-meal glucose volatility, afternoon energy slumps, and microbial dysbiosis.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-heading text-xl font-bold shadow-sm">
              1
            </div>
            <h3 className="font-heading text-2xl font-bold text-slate-900">Viscous Satiety Matrix</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Soluble Oat Beta-Glucan absorbs water in the upper GI tract, forming a high-viscosity matrix that slows gastric emptying and moderates blood glucose entry into circulation.
            </p>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-heading text-xl font-bold shadow-sm">
              2
            </div>
            <h3 className="font-heading text-2xl font-bold text-slate-900">Colonic SCFA Fermentation</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Prebiotic Acacia Fiber and Resistant Starch bypass early digestion to reach the distal colon, serving as fuel for <i>Bifidobacteria</i> to synthesize Acetate, Propionate, and Butyrate.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-heading text-xl font-bold shadow-sm">
              3
            </div>
            <h3 className="font-heading text-2xl font-bold text-slate-900">AMPK Metabolic Balance</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Standardized Berberine HCl activates the AMP-activated protein kinase pathway — often called the cellular metabolic master switch — supporting glucose uptake independently of insulin.
            </p>
          </div>

        </div>

      </div>

      {/* Embedded Live Simulator */}
      <div className="border-y border-slate-200 bg-slate-50/50">
        <GlucoseCurveSimulator setActiveTab={setActiveTab} />
      </div>

      {/* Embedded 3D Layered Anatomy */}
      <FormulaExplodedView setActiveTab={setActiveTab} />

      {/* Embedded Gut Brain Map */}
      <div className="border-y border-slate-200 bg-slate-50/50">
        <GutBrainSynapseMap setActiveTab={setActiveTab} />
      </div>

      {/* Post GLP-1 Era Feature Container */}
      <div className="container-max text-left">
        <div className="bg-slate-950 text-white rounded-[36px] p-10 md:p-14 space-y-6 shadow-xl">
          <span className="tag bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-mono font-bold">
            Clinical Perspective
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-snug max-w-2xl">
            Designed for Long-Term Habits in the Post-GLP-1 Era.
          </h2>
          <p className="text-slate-300 text-base max-w-3xl leading-relaxed font-sans">
            As GLP-1 receptor agonist adoption accelerates, maintaining lean muscle mass, gut motility, and foundational SCFA production is essential. TriFiber Health delivers an evidence-led daily nutritional foundation to prevent post-medication rebound and build sustainable metabolic resilience.
          </p>
          
          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('trifiber-daily')}
              className="btn btn-primary px-7 py-3.5 flex items-center gap-2"
            >
              <span>Shop TriFiber Daily</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('berberine-balance')}
              className="btn btn-secondary !bg-slate-900 !border-slate-700 !text-white hover:!bg-slate-800 px-7 py-3.5"
            >
              Shop Berberine Balance
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
