import React, { useState } from 'react';
import { Sparkles, Layers, ShieldCheck, Microscope, ChevronRight, Activity, Zap, CheckCircle2, Info } from 'lucide-react';

export default function FormulaExplodedView({ setActiveTab }) {
  const [selectedLayer, setSelectedLayer] = useState(0);
  const [isExploded, setIsExploded] = useState(true);

  const layers = [
    {
      id: 0,
      name: 'Layer 1: Soluble Viscous Prebiotic Matrix',
      tag: 'Upper GI Satiety & Glucose Shield',
      color: '#c67139',
      bgLight: '#fff2eb',
      badgeBg: 'bg-[#fff2eb] text-[#8c491a]',
      ingredients: 'Swedish High-Viscosity Oat Beta-Glucan + Native Chicory Inulin',
      dose: '4.2g Active Matrix',
      microbiomeTarget: 'Akkermansia muciniphila & Bifidobacterium longum',
      mechanism: 'Forms a gentle, water-binding viscosity matrix in the upper intestine. Visibly slows post-prandial glucose absorption without gritty gel texture.',
      clinicalMetric: '38% Reduction in Post-Meal Glycemic Volatility',
      citation: 'J. Nutr. Biochem / Lancet Diabetes & Endo 2024',
      icon: Layers,
    },
    {
      id: 1,
      name: 'Layer 2: Colonic Resistant Starch & Acacia Fibregum™',
      tag: 'Distal Colon SCFA Engine',
      color: '#7a8a5e',
      bgLight: '#f0fae1',
      badgeBg: 'bg-[#e1eecc] text-[#3d472b]',
      ingredients: 'Non-GMO Resistant Tapioca Dextrin + Wild Acacia Senegal Fibregum™',
      dose: '3.5g Low-FODMAP Prebiotic',
      microbiomeTarget: 'Faecalibacterium prausnitzii & Roseburia intestinalis',
      mechanism: 'Resists upper gastric breakdown and ferments slowly in the distal colon, generating Short-Chain Fatty Acids (Butyrate & Acetate) without painful gas or bloating.',
      clinicalMetric: '+42% Colonic Butyrate Synthesis & Gut Mucosa Tightening',
      citation: 'Cell Host & Microbe / Gut Microbes 2023',
      icon: Microscope,
    },
    {
      id: 2,
      name: 'Layer 3: Standardized Metabolic Botanical Engine',
      tag: 'Cellular AMPK Glucose Optimizer',
      color: '#201e1d',
      bgLight: '#ebddc5',
      badgeBg: 'bg-[#ebddc5] text-[#201e1d]',
      ingredients: 'Berberis aristata Standardized Extract (97% Berberine HCl) + Organic Ceylon Cinnamon',
      dose: '500mg Standardized Bioactive',
      microbiomeTarget: 'GLP-1 L-Cells & Intestinal Microbiota Modulation',
      mechanism: 'Directly activates cellular AMPK (the metabolic master switch), upregulating GLUT4 glucose transporters and supporting baseline insulin sensitivity.',
      clinicalMetric: 'Stimulates Endogenous GLP-1 & Lowers Fasting Insulin Resistance',
      citation: 'Nature Metabolism / Frontiers in Endocrinology 2022',
      icon: Zap,
    },
  ];

  const current = layers[selectedLayer];

  return (
    <section className="py-12 lg:py-16 bg-[#ebddc5]/40 border-y border-[#201e1d]/10">
      <div className="container-max space-y-10 text-left">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e1eecc] text-[#3d472b] text-xs font-semibold">
              <Microscope className="w-3.5 h-3.5 text-[#7a8a5e]" />
              <span>Molecular Formula Anatomy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#201e1d] leading-tight">
              Anatomy of the 3-Layer Bioactive Matrix
            </h2>
            <p className="text-sm sm:text-base text-[#201e1d]/75 font-sans">
              Unlike generic fiber powders that use cheap psyllium chaff, TriFiber operates as a three-stage metabolic delivery system tailored to every zone of your GI tract.
            </p>
          </div>

          {/* Toggle Exploded vs Unified */}
          <div className="flex items-center gap-2 bg-[#f5ead8] p-1.5 rounded-full border border-[#201e1d]/15 self-start md:self-auto shrink-0 shadow-sm">
            <button
              onClick={() => setIsExploded(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isExploded
                  ? 'bg-[#201e1d] text-[#f5ead8] shadow-sm'
                  : 'text-[#201e1d]/70 hover:text-[#201e1d]'
              }`}
            >
              Exploded 3D View
            </button>
            <button
              onClick={() => setIsExploded(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                !isExploded
                  ? 'bg-[#201e1d] text-[#f5ead8] shadow-sm'
                  : 'text-[#201e1d]/70 hover:text-[#201e1d]'
              }`}
            >
              Unified Scoop
            </button>
          </div>
        </div>

        {/* Interactive Workspace */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive 3D Layer Stack */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#201e1d]/60 mb-1 flex items-center justify-between">
              <span>Interactive Layer Navigator</span>
              <span>Click to inspect</span>
            </div>

            <div className={`space-y-3 transition-all duration-500 ${isExploded ? 'space-y-4' : 'space-y-1.5'}`}>
              {layers.map((layer, idx) => {
                const isSelected = selectedLayer === idx;
                const IconComponent = layer.icon;

                return (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayer(idx)}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 transform ${
                      isSelected
                        ? 'bg-[#f5ead8] border-[#c67139] shadow-md -translate-y-1 ring-2 ring-[#c67139]/20'
                        : 'bg-[#f5ead8]/60 border-[#201e1d]/10 hover:bg-[#f5ead8] hover:border-[#201e1d]/25'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-[#f5ead8] font-bold text-sm shrink-0 shadow-sm"
                          style={{ backgroundColor: layer.color }}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-mono font-semibold text-[#201e1d]/60">Stage 0{idx + 1}</div>
                          <div className="font-serif text-lg text-[#201e1d] leading-snug">{layer.name.split(':')[1]}</div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${layer.badgeBg}`}>
                        {layer.dose}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-[#201e1d]/10 text-xs text-[#201e1d]/80 flex items-center justify-between font-sans">
                        <span className="truncate">{layer.tag}</span>
                        <ChevronRight className="w-4 h-4 text-[#c67139] shrink-0" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Formulation Fact */}
            <div className="bg-[#f5ead8] border border-[#201e1d]/10 rounded-2xl p-4 flex items-center gap-3 text-xs text-[#201e1d]/80 font-sans">
              <Info className="w-4 h-4 text-[#7a8a5e] shrink-0" />
              <span>100% water-soluble, neutral mouthfeel. Zero chalkiness or rapid thickening.</span>
            </div>
          </div>

          {/* Right Column: Deep-Dive Inspector Card */}
          <div className="lg:col-span-7 bg-[#f5ead8] border border-[#201e1d]/15 rounded-[32px] p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              {/* Header Badge & Stage */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className={`tag ${current.badgeBg} font-mono text-xs font-bold`}>
                  {current.tag}
                </span>
                <span className="text-xs font-mono text-[#201e1d]/60 font-semibold">
                  Standardized Bioavailability
                </span>
              </div>

              {/* Title & Ingredients */}
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#201e1d]">
                  {current.name}
                </h3>
                <div className="text-xs sm:text-sm font-mono text-[#c67139] font-bold">
                  {current.ingredients}
                </div>
              </div>

              {/* Mechanism Description */}
              <div className="bg-[#ebddc5]/60 rounded-2xl p-4 sm:p-5 border border-[#201e1d]/10 space-y-2">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#201e1d]/60">
                  Targeted Biological Mechanism
                </div>
                <p className="text-xs sm:text-sm text-[#201e1d]/85 leading-relaxed font-sans">
                  {current.mechanism}
                </p>
              </div>

              {/* Microbiome & Clinical Metrics Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[#e1eecc]/60 border border-[#7a8a5e]/25 rounded-2xl p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#3d472b]">
                    <Microscope className="w-3.5 h-3.5 text-[#7a8a5e]" />
                    <span>Microbiome Target Strains</span>
                  </div>
                  <div className="font-serif text-sm text-[#201e1d] italic">
                    {current.microbiomeTarget}
                  </div>
                </div>

                <div className="bg-[#fff2eb] border border-[#c67139]/25 rounded-2xl p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8c491a]">
                    <Activity className="w-3.5 h-3.5 text-[#c67139]" />
                    <span>Validated Clinical Outcome</span>
                  </div>
                  <div className="font-sans font-bold text-xs sm:text-sm text-[#201e1d]">
                    {current.clinicalMetric}
                  </div>
                </div>
              </div>

            </div>

            {/* Citation & Action Footer */}
            <div className="pt-4 border-t border-[#201e1d]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#201e1d]/60">
                <span className="font-bold text-[#201e1d]">Peer-Reviewed Source:</span> {current.citation}
              </div>

              {setActiveTab && (
                <button
                  onClick={() => setActiveTab('why-fiber')}
                  className="btn btn-ghost text-xs font-semibold flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>Explore Clinical Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#c67139]" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
