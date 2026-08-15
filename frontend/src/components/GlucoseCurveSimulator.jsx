import React, { useState } from 'react';
import { Activity, Zap, TrendingDown, ArrowRight, Clock, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function GlucoseCurveSimulator({ setActiveTab }) {
  const [mealType, setMealType] = useState('lunch'); // 'breakfast', 'lunch', 'dinner'
  const [withTriFiber, setWithTriFiber] = useState(true);

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

  const noFiberPath = "M 20,160 Q 90,30 140,50 T 260,175 Q 320,165 380,155";
  const triFiberPath = "M 20,160 Q 110,105 180,100 T 290,118 Q 340,135 380,150";

  return (
    <div className="py-8 lg:py-12 bg-white text-left">
      <div className="container-max space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-800 text-xs font-semibold border border-orange-200">
              <Activity className="w-3.5 h-3.5 text-orange-600" />
              <span>Continuous Glucose Simulation (CGM)</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              Watch How TriFiber Flattens the Post-Meal Glucose Curve
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-sans">
              Experience the physiological difference between erratic glycemic spikes that trigger insulin resistance vs. a sustained, fiber-buffered metabolic plateau.
            </p>
          </div>

          {/* Meal Type Preset Tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto shrink-0 shadow-sm">
            {Object.keys(mealPresets).map(key => (
              <button
                key={key}
                onClick={() => setMealType(key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  mealType === key
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
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
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
            
            {/* Graph Header & Protocol Switch */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Continuous Glucose Simulation
                </span>
                <div className="font-heading text-xl font-bold text-slate-900">{activePreset.name}</div>
              </div>

              {/* Protocol Toggle Buttons */}
              <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 text-xs shadow-sm">
                <button
                  onClick={() => setWithTriFiber(false)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    !withTriFiber
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Without Fiber
                </button>
                <button
                  onClick={() => setWithTriFiber(true)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    withTriFiber
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  + TriFiber Protocol
                </button>
              </div>
            </div>

            {/* SVG Interactive Chart */}
            <div className="relative bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 overflow-hidden shadow-sm">
              
              {/* Y-Axis Labels */}
              <div className="absolute left-3 top-4 bottom-8 flex flex-col justify-between text-[10px] font-mono text-slate-400 pointer-events-none select-none">
                <span>190 mg/dL</span>
                <span>140 mg/dL</span>
                <span>90 mg/dL</span>
              </div>

              {/* Chart SVG */}
              <div className="ml-12 mr-2">
                <svg viewBox="0 0 400 200" className="w-full h-48 sm:h-56 overflow-visible">
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="400" y2="40" stroke="#94a3b8" strokeOpacity="0.2" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#94a3b8" strokeOpacity="0.2" strokeDasharray="3 3" />
                  <line x1="0" y1="160" x2="400" y2="160" stroke="#94a3b8" strokeOpacity="0.3" />

                  {/* Target Optimal Zone (90 - 130 mg/dL) */}
                  <rect x="0" y="80" width="400" height="80" fill="#10b981" fillOpacity="0.08" rx="4" />
                  <text x="390" y="95" textAnchor="end" className="text-[9px] font-mono fill-emerald-700 font-bold">
                    Optimal Satiety Zone
                  </text>

                  {/* Without Fiber Curve (Spike & Crash) */}
                  <path
                    d={noFiberPath}
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth={!withTriFiber ? "3.5" : "1.5"}
                    strokeOpacity={!withTriFiber ? "1" : "0.35"}
                    strokeDasharray={withTriFiber ? "4 4" : "none"}
                    className="transition-all duration-500"
                  />

                  {/* With TriFiber Curve (Smooth Plateau) */}
                  <path
                    d={triFiberPath}
                    fill="none"
                    stroke="#059669"
                    strokeWidth={withTriFiber ? "4" : "1.5"}
                    strokeOpacity={withTriFiber ? "1" : "0.35"}
                    className="transition-all duration-500"
                  />

                  {/* Annotations */}
                  {!withTriFiber && (
                    <g className="animate-pulse">
                      <circle cx="115" cy="42" r="5" fill="#e11d48" />
                      <text x="125" y="40" className="text-[10px] font-mono font-bold fill-rose-600">
                        Spike: {activePreset.noFiberPeak} mg/dL
                      </text>
                      <circle cx="260" cy="175" r="5" fill="#e11d48" />
                      <text x="265" y="190" className="text-[10px] font-mono font-bold fill-rose-600">
                        Crash: {activePreset.noFiberCrash} mg/dL
                      </text>
                    </g>
                  )}

                  {withTriFiber && (
                    <g>
                      <circle cx="170" cy="100" r="5" fill="#059669" />
                      <text x="180" y="94" className="text-[10px] font-mono font-bold fill-emerald-700">
                        Steady Peak: {activePreset.triFiberPeak} mg/dL
                      </text>
                    </g>
                  )}
                </svg>

                {/* X-Axis Time Markers */}
                <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
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
                  <span className="w-3 h-1 bg-rose-600 rounded-full inline-block"></span>
                  <span className="text-slate-600">No Fiber (Erratic Spike)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-emerald-700 rounded-full inline-block"></span>
                  <span className="text-slate-900 font-bold">+ TriFiber (Controlled Plateau)</span>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 font-sans">
                Based on continuous glycemic load studies
              </span>
            </div>

          </div>

          {/* Right Column: Key Physiological Metrics */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
            
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="tag tag-accent text-[11px] font-mono font-bold">
                  Metabolic Comparison Metrics
                </span>
                <h3 className="font-heading text-2xl font-bold text-slate-900">
                  {withTriFiber ? 'TriFiber Buffered State' : 'Unbuffered Starch State'}
                </h3>
              </div>

              {/* Metric Comparison Cards */}
              <div className="space-y-3">
                
                {/* Metric 1: Peak Glycemia */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-slate-500">Peak Post-Meal Glucose</div>
                    <div className="font-heading text-2xl font-bold text-slate-900 mt-0.5">
                      {withTriFiber ? `${activePreset.triFiberPeak} mg/dL` : `${activePreset.noFiberPeak} mg/dL`}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                    withTriFiber ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>
                    {withTriFiber ? 'Balanced' : '+58 mg/dL Spike'}
                  </div>
                </div>

                {/* Metric 2: Full Satiety Window */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-slate-500">Satiety & Fullness Duration</div>
                    <div className="font-heading text-2xl font-bold text-slate-900 mt-0.5">
                      {withTriFiber ? activePreset.satietyYes : activePreset.satietyNo}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-emerald-700 font-bold">
                    {withTriFiber ? 'Extended Motility' : 'Rapid Emptying'}
                  </div>
                </div>

                {/* Metric 3: Endogenous GLP-1 Elevation */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-slate-500">Endogenous GLP-1 & PYY Signal</div>
                    <div className="font-heading text-2xl font-bold text-emerald-700 mt-0.5">
                      {withTriFiber ? activePreset.glp1Delta : 'Baseline (0%)'}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-600">
                    L-Cell Triggered
                  </div>
                </div>

                {/* Metric 4: Afternoon Brain Fog / Crash Risk */}
                <div className={`rounded-2xl p-4 border flex items-center gap-3 ${
                  withTriFiber
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}>
                  {withTriFiber ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
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
    </div>
  );
}
