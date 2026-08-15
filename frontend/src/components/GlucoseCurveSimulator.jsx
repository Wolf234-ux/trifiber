import React, { useState } from 'react';
import { Activity, Zap, TrendingDown, ArrowRight, Clock, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function GlucoseCurveSimulator({ setActiveTab }) {
  const [mealType, setMealType] = useState('lunch'); // 'breakfast', 'lunch', 'dinner', 'snack'
  const [withTriFiber, setWithTriFiber] = useState(true);
  const [hoveredTime, setHoveredTime] = useState(null);

  const mealPresets = {
    breakfast: {
      name: 'Carb-Heavy Breakfast',
      desc: 'Toast, smoothie or cereal with rapid starch release',
      noFiberPeak: 168,
      triFiberPeak: 118,
      noFiberCrash: 72,
      triFiberSteady: 98,
      satietyNo: '1.5 hrs',
      satietyYes: '4.5 hrs',
      glp1Delta: '+210%',
      crashRisk: 'High (10:30 AM Brain Fog)',
    },
    lunch: {
      name: 'Standard Working Lunch',
      desc: 'Rice, pasta, sandwich, or grain bowl',
      noFiberPeak: 182,
      triFiberPeak: 124,
      noFiberCrash: 68,
      triFiberSteady: 102,
      satietyNo: '2.0 hrs',
      satietyYes: '5.0 hrs',
      glp1Delta: '+240%',
      crashRisk: 'Severe (3:00 PM Afternoon Slump)',
    },
    dinner: {
      name: 'Evening Meal',
      desc: 'Restaurant dinner or high-carb evening comfort meal',
      noFiberPeak: 174,
      triFiberPeak: 120,
      noFiberCrash: 76,
      triFiberSteady: 96,
      satietyNo: '2.5 hrs',
      satietyYes: 'All Night Satiety',
      glp1Delta: '+185%',
      crashRisk: 'Late-Night Snacking Triggers',
    },
  };

  const activePreset = mealPresets[mealType];

  // Generate SVG curve points
  // X: 0 -> 400 (represents 0 to 180 min)
  // Y: 200 (baseline 80 mg/dL) to 20 (high 190 mg/dL)
  // Standard curve: steep spike at x=100 (45m), drops below baseline at x=260 (120m), slow recovery
  // TriFiber curve: gentle curve peaking at x=140 (60m) at lower amplitude, sustained plateau
  const noFiberPath = "M 20,160 Q 90,30 140,50 T 260,175 Q 320,165 380,155";
  const triFiberPath = "M 20,160 Q 110,105 180,100 T 290,118 Q 340,135 380,150";

  return (
    <section className="py-12 lg:py-16 bg-[#f5ead8]">
      <div className="container-max space-y-10 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff2eb] text-[#8c491a] text-xs font-semibold">
              <Activity className="w-3.5 h-3.5 text-[#c67139]" />
              <span>Real-Time Metabolic Response Simulator</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#201e1d] leading-tight">
              Watch How TriFiber Flattens the Post-Meal Glucose Curve
            </h2>
            <p className="text-sm sm:text-base text-[#201e1d]/75 font-sans">
              Experience the physiological difference between erratic glycemic spikes that trigger insulin resistance vs. a sustained, fiber-buffered metabolic plateau.
            </p>
          </div>

          {/* Meal Type Preset Tabs */}
          <div className="flex flex-wrap gap-2 bg-[#ebddc5] p-1.5 rounded-2xl border border-[#201e1d]/10 self-start md:self-auto shrink-0 shadow-sm">
            {Object.keys(mealPresets).map(key => (
              <button
                key={key}
                onClick={() => setMealType(key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  mealType === key
                    ? 'bg-[#201e1d] text-[#f5ead8] shadow-sm'
                    : 'text-[#201e1d]/70 hover:text-[#201e1d]'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Graph Display */}
          <div className="lg:col-span-7 bg-[#ebddc5] border border-[#201e1d]/15 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
            
            {/* Graph Header & Protocol Switch */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#201e1d]/60">
                  Continuous Glucose Simulation (CGM)
                </span>
                <div className="font-serif text-xl text-[#201e1d]">{activePreset.name}</div>
              </div>

              {/* Protocol Toggle Buttons */}
              <div className="flex items-center gap-2 bg-[#f5ead8] p-1 rounded-xl border border-[#201e1d]/15 text-xs">
                <button
                  onClick={() => setWithTriFiber(false)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    !withTriFiber
                      ? 'bg-[#b84a39] text-white shadow-sm'
                      : 'text-[#201e1d]/60 hover:text-[#201e1d]'
                  }`}
                >
                  Without Fiber
                </button>
                <button
                  onClick={() => setWithTriFiber(true)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    withTriFiber
                      ? 'bg-[#7a8a5e] text-white shadow-sm'
                      : 'text-[#201e1d]/60 hover:text-[#201e1d]'
                  }`}
                >
                  + TriFiber Protocol
                </button>
              </div>
            </div>

            {/* SVG Interactive Chart */}
            <div className="relative bg-[#f5ead8] border border-[#201e1d]/10 rounded-2xl p-4 sm:p-6 overflow-hidden">
              
              {/* Y-Axis Labels */}
              <div className="absolute left-3 top-4 bottom-8 flex flex-col justify-between text-[10px] font-mono text-[#201e1d]/50 pointer-events-none select-none">
                <span>190 mg/dL</span>
                <span>140 mg/dL</span>
                <span>90 mg/dL</span>
              </div>

              {/* Chart SVG */}
              <div className="ml-12 mr-2">
                <svg viewBox="0 0 400 200" className="w-full h-48 sm:h-56 overflow-visible">
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="400" y2="40" stroke="#201e1d" strokeOpacity="0.08" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#201e1d" strokeOpacity="0.08" strokeDasharray="3 3" />
                  <line x1="0" y1="160" x2="400" y2="160" stroke="#201e1d" strokeOpacity="0.15" />

                  {/* Target Optimal Zone (90 - 130 mg/dL) */}
                  <rect x="0" y="80" width="400" height="80" fill="#7a8a5e" fillOpacity="0.08" rx="4" />
                  <text x="390" y="95" textAnchor="end" className="text-[9px] font-mono fill-[#7a8a5e] font-bold">
                    Optimal Satiety Zone
                  </text>

                  {/* Without Fiber Curve (Spike & Crash) */}
                  <path
                    d={noFiberPath}
                    fill="none"
                    stroke="#b84a39"
                    strokeWidth={!withTriFiber ? "3.5" : "1.5"}
                    strokeOpacity={!withTriFiber ? "1" : "0.35"}
                    strokeDasharray={withTriFiber ? "4 4" : "none"}
                    className="transition-all duration-500"
                  />

                  {/* With TriFiber Curve (Smooth Plateau) */}
                  <path
                    d={triFiberPath}
                    fill="none"
                    stroke="#7a8a5e"
                    strokeWidth={withTriFiber ? "4" : "1.5"}
                    strokeOpacity={withTriFiber ? "1" : "0.35"}
                    className="transition-all duration-500"
                  />

                  {/* Annotations */}
                  {!withTriFiber && (
                    <g className="animate-pulse">
                      <circle cx="115" cy="42" r="5" fill="#b84a39" />
                      <text x="125" y="40" className="text-[10px] font-mono font-bold fill-[#b84a39]">
                        Spike: {activePreset.noFiberPeak} mg/dL
                      </text>
                      <circle cx="260" cy="175" r="5" fill="#b84a39" />
                      <text x="265" y="190" className="text-[10px] font-mono font-bold fill-[#b84a39]">
                        Crash: {activePreset.noFiberCrash} mg/dL
                      </text>
                    </g>
                  )}

                  {withTriFiber && (
                    <g>
                      <circle cx="170" cy="100" r="5" fill="#7a8a5e" />
                      <text x="180" y="94" className="text-[10px] font-mono font-bold fill-[#7a8a5e]">
                        Steady Peak: {activePreset.triFiberPeak} mg/dL
                      </text>
                    </g>
                  )}
                </svg>

                {/* X-Axis Time Markers */}
                <div className="flex justify-between text-[10px] font-mono text-[#201e1d]/60 pt-2 border-t border-[#201e1d]/10">
                  <span>0 min (Meal)</span>
                  <span>45 min</span>
                  <span>90 min</span>
                  <span>120 min</span>
                  <span>180 min</span>
                </div>
              </div>

            </div>

            {/* Legend Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-[#b84a39] rounded-full inline-block"></span>
                  <span className="text-[#201e1d]/80">No Fiber (Erratic Spike)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-[#7a8a5e] rounded-full inline-block"></span>
                  <span className="text-[#201e1d] font-bold">+ TriFiber (Controlled Plateau)</span>
                </div>
              </div>
              <span className="text-[11px] text-[#201e1d]/60 font-sans">
                Based on continuous glycemic load studies
              </span>
            </div>

          </div>

          {/* Right Column: Key Physiological Metrics */}
          <div className="lg:col-span-5 bg-[#f5ead8] border border-[#201e1d]/15 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
            
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="tag tag-accent text-[11px] font-mono font-bold">
                  Metabolic Comparison Metrics
                </span>
                <h3 className="font-serif text-2xl text-[#201e1d]">
                  {withTriFiber ? 'TriFiber Buffered State' : 'Unbuffered Starch State'}
                </h3>
              </div>

              {/* Metric Comparison Cards */}
              <div className="space-y-3">
                
                {/* Metric 1: Peak Glycemia */}
                <div className="bg-[#ebddc5] rounded-2xl p-4 border border-[#201e1d]/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-[#201e1d]/60">Peak Post-Meal Glucose</div>
                    <div className="font-serif text-2xl text-[#201e1d] mt-0.5">
                      {withTriFiber ? `${activePreset.triFiberPeak} mg/dL` : `${activePreset.noFiberPeak} mg/dL`}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                    withTriFiber ? 'bg-[#e1eecc] text-[#3d472b]' : 'bg-[#fff2eb] text-[#8c491a]'
                  }`}>
                    {withTriFiber ? 'Balanced' : '+58 mg/dL Spike'}
                  </div>
                </div>

                {/* Metric 2: Full Satiety Window */}
                <div className="bg-[#ebddc5] rounded-2xl p-4 border border-[#201e1d]/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-[#201e1d]/60">Satiety & Fullness Duration</div>
                    <div className="font-serif text-2xl text-[#201e1d] mt-0.5">
                      {withTriFiber ? activePreset.satietyYes : activePreset.satietyNo}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-[#7a8a5e] font-bold">
                    {withTriFiber ? 'Extended Motility' : 'Rapid Emptying'}
                  </div>
                </div>

                {/* Metric 3: Endogenous GLP-1 Elevation */}
                <div className="bg-[#ebddc5] rounded-2xl p-4 border border-[#201e1d]/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-[#201e1d]/60">Endogenous GLP-1 & PYY Signal</div>
                    <div className="font-serif text-2xl text-[#7a8a5e] mt-0.5">
                      {withTriFiber ? activePreset.glp1Delta : 'Baseline (0%)'}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-[#201e1d]/70">
                    L-Cell Triggered
                  </div>
                </div>

                {/* Metric 4: Afternoon Brain Fog / Crash Risk */}
                <div className={`rounded-2xl p-4 border flex items-center gap-3 ${
                  withTriFiber
                    ? 'bg-[#e1eecc] border-[#7a8a5e]/30 text-[#3d472b]'
                    : 'bg-[#fff2eb] border-[#c67139]/30 text-[#8c491a]'
                }`}>
                  {withTriFiber ? (
                    <CheckCircle2 className="w-5 h-5 text-[#7a8a5e] shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-[#c67139] shrink-0" />
                  )}
                  <div className="text-xs font-sans">
                    <span className="font-bold">Post-Meal Outcome: </span>
                    {withTriFiber ? 'Zero afternoon slump; stable focus and mental clarity.' : activePreset.crashRisk}
                  </div>
                </div>

              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => setActiveTab && setActiveTab('trifiber-daily')}
                className="btn btn-primary w-full text-sm py-3.5 flex items-center justify-center gap-2"
              >
                <span>Stabilize Your Routine with TriFiber</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
