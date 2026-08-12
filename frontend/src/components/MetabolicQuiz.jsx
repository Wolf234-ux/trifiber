import React, { useState } from 'react';
import { Sparkles, Activity, CheckCircle2, RefreshCw, ArrowRight, Flame, ShieldAlert } from 'lucide-react';

export default function MetabolicQuiz({ setActiveTab }) {
  const [formData, setFormData] = useState({
    glucose_spikes: 3,
    cravings_score: 3,
    fiber_intake: 2,
    satiety_duration: 2
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSliderChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: parseInt(value, 10) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Quiz submission error:', err);
      // Fallback calculation if backend unreachable
      const score = Math.max(10, 100 - (formData.glucose_spikes * 15 + formData.cravings_score * 12 + (6 - formData.fiber_intake) * 12 + (6 - formData.satiety_duration) * 15));
      setResult({
        metabolic_score: score,
        risk_level: score > 70 ? 'Optimal' : score > 45 ? 'Moderate Fiber Deficit' : 'High Glucose Volatility',
        recommended_product: score < 50 ? 'The Daily Metabolic Stack' : 'TriFiber Daily',
        daily_routine: '1 Scoop of TriFiber Daily 15 minutes before lunch, pair with 1 capsule Berberine Balance if post-meal crashes persist.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quiz" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive Clinical Assessment</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100">
              Calculate Your Metabolic Health Score
            </h2>

            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              Analyze your post-meal energy crashes, fiber deficit score, and satiety window in 60 seconds to get your personalized daily habit protocol.
            </p>
          </div>

          {!result ? (
            /* Quiz Form */
            <form onSubmit={handleSubmit} className="glass-dark rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8 shadow-2xl">
              
              {/* Question 1 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    1. Post-meal lethargy & glucose spike severity
                  </label>
                  <span className="font-mono text-xs text-amber-400 font-bold">Level {formData.glucose_spikes} / 5</span>
                </div>
                <input
                  type="range" min="1" max="5" step="1"
                  value={formData.glucose_spikes}
                  onChange={(e) => handleSliderChange('glucose_spikes', e.target.value)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>1: Steady post-meal energy</span>
                  <span>5: Severe energy crashes / brain fog</span>
                </div>
              </div>

              {/* Question 2 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    2. Afternoon sugar & carb craving frequency
                  </label>
                  <span className="font-mono text-xs text-emerald-400 font-bold">Level {formData.cravings_score} / 5</span>
                </div>
                <input
                  type="range" min="1" max="5" step="1"
                  value={formData.cravings_score}
                  onChange={(e) => handleSliderChange('cravings_score', e.target.value)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>1: Rare sugar cravings</span>
                  <span>5: Daily 4 PM sugar desperation</span>
                </div>
              </div>

              {/* Question 3 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-blue-400" />
                    3. Estimated daily plant fiber intake
                  </label>
                  <span className="font-mono text-xs text-blue-400 font-bold">Level {formData.fiber_intake} / 5</span>
                </div>
                <input
                  type="range" min="1" max="5" step="1"
                  value={formData.fiber_intake}
                  onChange={(e) => handleSliderChange('fiber_intake', e.target.value)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>1: Very low (&lt;10g/day)</span>
                  <span>5: High (&gt;30g/day whole plants)</span>
                </div>
              </div>

              {/* Question 4 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-200">
                    4. Satiety duration after typical lunch
                  </label>
                  <span className="font-mono text-xs text-emerald-400 font-bold">Level {formData.satiety_duration} / 5</span>
                </div>
                <input
                  type="range" min="1" max="5" step="1"
                  value={formData.satiety_duration}
                  onChange={(e) => handleSliderChange('satiety_duration', e.target.value)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>1: Hungry within 1 hour</span>
                  <span>5: Full for 4+ hours</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-amber-500 text-slate-950 flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-xl cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Calculating Metabolic Score...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Clinical Assessment Report</span>
                  </>
                )}
              </button>

            </form>
          ) : (
            /* Results View */
            <div className="glass-dark rounded-3xl p-8 sm:p-12 border border-emerald-500/40 space-y-8 animate-fade-in shadow-2xl">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-6">
                <div>
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider font-semibold">Assessment Complete</span>
                  <h3 className="font-serif text-3xl font-bold text-slate-100">Your Metabolic Health Profile</h3>
                </div>

                {/* Score Gauge Circle */}
                <div className="flex items-center gap-4 bg-slate-900/90 px-6 py-4 rounded-2xl border border-slate-800">
                  <div className="text-center">
                    <span className="font-serif font-bold text-4xl text-amber-400">{result.metabolic_score}</span>
                    <span className="text-xs font-mono text-slate-400 block">/ 100</span>
                  </div>
                  <div className="border-l border-slate-800 pl-4 text-left">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Risk Classification</span>
                    <p className="text-sm font-bold text-emerald-400">{result.risk_level}</p>
                  </div>
                </div>
              </div>

              {/* Protocol Recommendation */}
              <div className="space-y-4">
                <h4 className="font-serif text-xl font-bold text-slate-200">Recommended Daily Protocol</h4>
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Recommended Formula: {result.recommended_product}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {result.daily_routine}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => setActiveTab('products')}
                  className="btn-primary"
                >
                  <span>Order Recommended Protocol</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setResult(null)}
                  className="btn-outline-dark"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retake Assessment</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
