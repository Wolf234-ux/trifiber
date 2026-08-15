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
      color: '#ea580c',
      bgLight: '#fff7ed',
      badgeBg: 'bg-orange-50 text-orange-800 border border-orange-200',
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
      color: '#15803d',
      bgLight: '#f0fdf4',
      badgeBg: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
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
      color: '#0f172a',
      bgLight: '#f8fafc',
      badgeBg: 'bg-slate-100 text-slate-900 border border-slate-200',
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
    <div className="py-8 lg:py-12 bg-white text-left">
      <div className="container-max space-y-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <Microscope className="w-3.5 h-3.5 text-emerald-600" />
              <span>Molecular Formula Anatomy</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              Anatomy of the 3-Layer Bioactive Matrix
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-sans">
              Unlike generic fiber powders that use cheap psyllium chaff, TriFiber operates as a three-stage metabolic delivery system tailored to every zone of your GI tract.
            </p>
          </div>

          {/* Toggle Exploded vs Unified */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-full border border-slate-200 self-start md:self-auto shrink-0 shadow-sm">
            <button
              onClick={() => setIsExploded(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isExploded
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Exploded 3D View
            </button>
            <button
              onClick={() => setIsExploded(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                !isExploded
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
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
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
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
                        ? 'bg-white border-orange-500 shadow-md -translate-y-1 ring-2 ring-orange-500/20'
                        : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
                          style={{ backgroundColor: layer.color }}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-mono font-semibold text-slate-500">Stage 0{idx + 1}</div>
                          <div className="font-heading text-lg font-bold text-slate-900 leading-snug">{layer.name.split(':')[1]}</div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${layer.badgeBg}`}>
                        {layer.dose}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-700 flex items-center justify-between font-sans">
                        <span className="truncate">{layer.tag}</span>
                        <ChevronRight className="w-4 h-4 text-orange-600 shrink-0" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Formulation Fact */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-slate-700 font-sans">
              <Info className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% water-soluble, neutral mouthfeel. Zero chalkiness or rapid thickening.</span>
            </div>
          </div>

          {/* Right Column: Deep-Dive Inspector Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[28px] p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              {/* Header Badge & Stage */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className={`tag ${current.badgeBg} font-mono text-xs font-bold`}>
                  {current.tag}
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  Standardized Bioavailability
                </span>
              </div>

              {/* Title & Ingredients */}
              <div className="space-y-2">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                  {current.name}
                </h3>
                <div className="text-xs sm:text-sm font-mono text-orange-600 font-bold">
                  {current.ingredients}
                </div>
              </div>

              {/* Mechanism Description */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                  Targeted Biological Mechanism
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  {current.mechanism}
                </p>
              </div>

              {/* Microbiome & Clinical Metrics Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                    <Microscope className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Microbiome Target Strains</span>
                  </div>
                  <div className="font-sans text-sm text-slate-900 font-semibold italic">
                    {current.microbiomeTarget}
                  </div>
                </div>

                <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-800">
                    <Activity className="w-3.5 h-3.5 text-orange-600" />
                    <span>Validated Clinical Outcome</span>
                  </div>
                  <div className="font-sans font-bold text-xs sm:text-sm text-slate-900">
                    {current.clinicalMetric}
                  </div>
                </div>
              </div>

            </div>

            {/* Citation & Action Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-500">
                <span className="font-bold text-slate-800">Peer-Reviewed Source:</span> {current.citation}
              </div>

              {setActiveTab && (
                <button
                  onClick={() => setActiveTab('why-fiber')}
                  className="btn btn-ghost text-xs font-semibold flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>Explore Clinical Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5 text-orange-600" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
