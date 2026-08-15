import React, { useState } from 'react';
import { Sparkles, Brain, Activity, Zap, CheckCircle2, ChevronRight, Share2, Compass, ShieldCheck, Heart } from 'lucide-react';

export default function GutBrainSynapseMap({ setActiveTab }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isSignaling, setIsSignaling] = useState(false);

  const steps = [
    {
      id: 0,
      zone: 'Colonic Biome',
      title: '1. Microbial Prebiotic Fermentation',
      icon: Activity,
      color: '#ea580c',
      badgeBg: 'bg-orange-50 text-orange-800 border border-orange-200',
      headline: 'Soluble prebiotics are converted into neuro-active Short-Chain Fatty Acids (SCFAs).',
      detail: 'As TriFiber reaches the distal colon, specialized taxa like Faecalibacterium prausnitzii and Bifidobacteria ferment the prebiotic matrix into Butyrate, Propionate, and Acetate.',
      stats: '18.5 mmol/L Butyrate Output',
      neuroMolecule: 'SCFA (Butyrate / Acetate)',
    },
    {
      id: 1,
      zone: 'Gut Mucosa',
      title: '2. Enteric Neurotransmitter Synthesis',
      icon: Heart,
      color: '#15803d',
      badgeBg: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
      headline: 'Enterochromaffin cells synthesize over 90% of the body’s total serotonin.',
      detail: 'Microbial SCFAs trigger gut enteroendocrine L-cells and enterochromaffin cells to synthesize Serotonin (5-HT) precursors and GABA, while stimulating endogenous GLP-1 release.',
      stats: '90%+ of Body Serotonin Originated in Gut',
      neuroMolecule: '5-HTP, Serotonin & GABA Precursors',
    },
    {
      id: 2,
      zone: 'Vagus Nerve',
      title: '3. The Vagal Neural Superhighway',
      icon: Zap,
      color: '#0f172a',
      badgeBg: 'bg-slate-100 text-slate-900 border border-slate-200',
      headline: 'Direct millisecond bi-directional communication to the brainstem.',
      detail: 'The 10th cranial nerve (Vagus Nerve) detects gut microbial signaling and transducts real-time signals to the Nucleus Tractus Solitarius in the brainstem, activating the parasympathetic cholinergic anti-inflammatory pathway.',
      stats: '80,000+ Afferent Neural Fibers',
      neuroMolecule: 'Acetylcholine & Vagal Transduction',
    },
    {
      id: 3,
      zone: 'Prefrontal Cortex',
      title: '4. Cognitive Clarity & Mood Resilience',
      icon: Brain,
      color: '#ea580c',
      badgeBg: 'bg-orange-50 text-orange-800 border border-orange-200',
      headline: 'Elevated BDNF, sustained focus, and elimination of midday brain fog.',
      detail: 'Balanced gut-derived neuro-signaling promotes Brain-Derived Neurotrophic Factor (BDNF) expression and stabilizes synaptic dopamine and GABA. You experience steady mental energy without reactive energy crashes.',
      stats: '+34% Subjective Cognitive Focus Index',
      neuroMolecule: 'BDNF & Synaptic Balance',
    },
  ];

  const triggerSignal = () => {
    setIsSignaling(true);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < steps.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsSignaling(false);
      }
    }, 750);
  };

  const current = steps[activeStep];
  const IconComponent = current.icon;

  return (
    <div className="py-8 lg:py-12 bg-white text-left">
      <div className="container-max space-y-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <Brain className="w-3.5 h-3.5 text-emerald-600" />
              <span>The Gut-Brain & Neuro-Metabolic Axis</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              How Gut Microbes Drive Neurotransmitters & Mental Clarity
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-sans">
              Your gut and brain are in constant dialogue. Trace the step-by-step biological cascade from prebiotic colonic fermentation to prefrontal cognitive performance.
            </p>
          </div>

          <button
            onClick={triggerSignal}
            disabled={isSignaling}
            className="btn btn-primary text-xs px-5 py-3 flex items-center gap-2 self-start md:self-auto shadow-sm"
          >
            <Zap className={`w-4 h-4 ${isSignaling ? 'animate-bounce text-yellow-300' : ''}`} />
            <span>{isSignaling ? 'Transmitting Neural Pulse...' : 'Simulate Neural Signal ⚡'}</span>
          </button>
        </div>

        {/* Interactive Stepper Navigation Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((s, idx) => {
            const isCurrent = activeStep === idx;
            const StepIcon = s.icon;
            return (
              <div
                key={s.id}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 ${
                  isCurrent
                    ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-500/20 -translate-y-0.5'
                    : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: s.color }}
                  >
                    <StepIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                    Stage 0{idx + 1}
                  </span>
                </div>
                <div className="font-heading text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                  {s.zone}
                </div>
                <div className="text-[11px] font-sans text-slate-500 line-clamp-1 mt-0.5">
                  {s.neuroMolecule}
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Stage Viewer */}
        <div className="bg-slate-50 border border-slate-200 rounded-[28px] p-6 sm:p-10 shadow-sm grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Pathway Diagram / Icon Hub */}
          <div className="lg:col-span-5 bg-white rounded-[24px] p-6 border border-slate-200 flex flex-col items-center justify-center text-center space-y-4 min-h-[260px] shadow-sm">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-slate-50 border-2 border-orange-500 flex items-center justify-center shadow-md transform hover:scale-105 transition-transform">
                <IconComponent className="w-10 h-10 text-orange-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-mono font-bold shadow-sm">
                0{activeStep + 1}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Primary Bioactive Target
              </span>
              <div className="font-heading text-lg font-bold text-slate-900">
                {current.neuroMolecule}
              </div>
            </div>

            <div className="bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 text-xs font-mono font-bold text-emerald-800">
              {current.stats}
            </div>
          </div>

          {/* Detailed Content Description */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`tag ${current.badgeBg} font-mono text-xs font-bold`}>
                  {current.zone}
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  Evidence-Led Neurobiology
                </span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                {current.headline}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
              {current.detail}
            </p>

            {/* Micro Benefits Matrix */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-white rounded-xl p-3.5 border border-slate-200 flex items-center gap-2.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">Zero Afternoon Energy Slumps</span>
              </div>
              <div className="bg-white rounded-xl p-3.5 border border-slate-200 flex items-center gap-2.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">GABA Mediated Stress Resilience</span>
              </div>
            </div>

            {/* Interactive Step Navigation Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setActiveStep(prev => (prev > 0 ? prev - 1 : steps.length - 1))}
                className="btn btn-ghost text-xs font-semibold"
              >
                &larr; Previous Stage
              </button>

              <button
                onClick={() => setActiveStep(prev => (prev < steps.length - 1 ? prev + 1 : 0))}
                className="btn btn-primary text-xs px-4 py-2 flex items-center gap-1"
              >
                <span>Next: {steps[(activeStep + 1) % steps.length].zone}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
