import React, { useState } from 'react';
import { Sparkles, Activity, CheckCircle2, RefreshCw, ArrowRight, Brain, AlertCircle, ShoppingBag, ShieldCheck, ChevronRight, Zap } from 'lucide-react';

export default function MetabolicQuiz({ setActiveTab, addToCart }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    glucose_spikes: 3,
    cravings_score: 3,
    fiber_intake: 2,
    satiety_duration: 2
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const calculateScoreLocally = (data) => {
    const base = 100;
    const spikePenalty = (data.glucose_spikes - 1) * 10;
    const cravingPenalty = (data.cravings_score - 1) * 8;
    const fiberBonus = (data.fiber_intake - 1) * 7;
    const satietyBonus = (data.satiety_duration - 1) * 6;
    
    let score = Math.max(30, Math.min(96, base - spikePenalty - cravingPenalty + fiberBonus + satietyBonus));
    let category = "Optimal Balance";
    let recommendation = "Your metabolic system is resilient! Daily multi-fiber maintenance will keep your gut microbiome thriving and maintain steady post-meal glucose.";
    let bundle = ["trifiber-daily"];
    let rec_product = "TriFiber Daily (Lemon-Jeera)";

    if (score < 60) {
      category = "High Metabolic & Satiety Deficit";
      recommendation = "Your score indicates significant post-meal glucose volatility and afternoon energy crashes. The Dual Metabolic Protocol (TriFiber Daily + Berberine Metabolic Balance) provides essential multi-pathway support.";
      bundle = ["trifiber-daily", "berberine-balance"];
      rec_product = "The Dual Metabolic Protocol (TriFiber Daily + Berberine Balance)";
    } else if (score < 80) {
      category = "Moderate Fiber & Glucose Gap";
      recommendation = "You are experiencing classic afternoon energy slumps and moderate carb cravings due to a 12-16g daily fiber deficit. Adding TriFiber Daily will extend meal satiety and flatten spikes.";
      bundle = ["trifiber-daily"];
      rec_product = "TriFiber Daily Foundation";
    }

    return {
      metabolic_score: score,
      category,
      recommendation,
      recommended_product: rec_product,
      recommended_skus: bundle,
      insights: {
        fiber_deficit_g: Math.max(8, 18 - (data.fiber_intake * 3)),
        glucose_volatility: data.glucose_spikes >= 4 ? "High" : data.glucose_spikes >= 2 ? "Moderate" : "Low",
        satiety_window_hours: Number((data.satiety_duration * 0.9 + 1.2).toFixed(1))
      }
    };
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        setResult(calculateScoreLocally(formData));
      }
    } catch (err) {
      console.warn('API quiz calculation fallback:', err);
      setResult(calculateScoreLocally(formData));
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetQuiz = () => {
    setResult(null);
    setStep(1);
    setFormData({
      glucose_spikes: 3,
      cravings_score: 3,
      fiber_intake: 2,
      satiety_duration: 2
    });
  };

  return (
    <div className="py-12 lg:py-16 bg-white text-left">
      <div className="container-max">
        <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-[36px] p-6 sm:p-10 text-left space-y-8 shadow-sm">
          
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="tag tag-accent text-xs font-mono font-bold">1-Min Interactive Tool</span>
              {!result && (
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  Step {step} of 4
                </span>
              )}
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Personalized Metabolic Satiety & Fiber Gap Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-sans">
              Discover your personal daily fiber deficit (in grams), glucose volatility index, and get an evidence-led daily routine.
            </p>
          </div>

          {/* Progress Bar */}
          {!result && (
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-orange-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          )}

          {/* Active Question Step Card */}
          {!result && (
            <div className="space-y-6">
              
              {/* Question 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                    1. How often do you experience 3 PM post-meal energy slumps or brain fog?
                  </h3>
                  <div className="grid gap-2.5">
                    {[
                      { val: 1, label: 'Rarely / High all-day steady energy' },
                      { val: 2, label: 'Occasional mild drowsiness (1-2x/week)' },
                      { val: 3, label: 'Moderate slump 3-4 days a week' },
                      { val: 4, label: 'Frequent daily crashes requiring coffee or sugar' },
                      { val: 5, label: 'Severe exhaustion after almost every heavy meal' },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setFormData({ ...formData, glucose_spikes: opt.val })}
                        className={`text-left p-4 rounded-2xl border text-sm font-sans transition-all flex items-center justify-between ${
                          formData.glucose_spikes === opt.val
                            ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-500/20 font-bold text-slate-900'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {formData.glucose_spikes === opt.val && (
                          <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                    2. Intensity of mid-afternoon sugar or refined carb cravings:
                  </h3>
                  <div className="grid gap-2.5">
                    {[
                      { val: 1, label: 'No cravings / Easy dietary control' },
                      { val: 2, label: 'Mild appetite, satisfied with water or light tea' },
                      { val: 3, label: 'Moderate urge for sweet snacks or cookies' },
                      { val: 4, label: 'Strong cravings that distract from work' },
                      { val: 5, label: 'Intense, uncontrollable sugar and refined starch cravings' },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setFormData({ ...formData, cravings_score: opt.val })}
                        className={`text-left p-4 rounded-2xl border text-sm font-sans transition-all flex items-center justify-between ${
                          formData.cravings_score === opt.val
                            ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-500/20 font-bold text-slate-900'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {formData.cravings_score === opt.val && (
                          <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                    3. Estimated daily servings of high-fiber whole foods (beans, seeds, oats, leafy greens):
                  </h3>
                  <div className="grid gap-2.5">
                    {[
                      { val: 1, label: 'Less than 1 serving (< 10g fiber/day — high fiber gap)' },
                      { val: 2, label: 'About 1-2 servings (~12-15g fiber/day)' },
                      { val: 3, label: 'About 2-3 servings (~18-20g fiber/day)' },
                      { val: 4, label: 'About 4 servings (~25g fiber/day)' },
                      { val: 5, label: '5+ servings daily (> 30g recommended clinical target)' },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setFormData({ ...formData, fiber_intake: opt.val })}
                        className={`text-left p-4 rounded-2xl border text-sm font-sans transition-all flex items-center justify-between ${
                          formData.fiber_intake === opt.val
                            ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-500/20 font-bold text-slate-900'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {formData.fiber_intake === opt.val && (
                          <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 4 */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                    4. Average fullness and satiety duration after your main meal:
                  </h3>
                  <div className="grid gap-2.5">
                    {[
                      { val: 1, label: 'Hungry again within 60-90 minutes (rapid gastric emptying)' },
                      { val: 2, label: 'Full for ~2 hours, then sharp hunger returns' },
                      { val: 3, label: 'Full for ~3 hours' },
                      { val: 4, label: 'Comfortably satiated for 4 hours' },
                      { val: 5, label: 'Sustained energy and fullness for 5+ hours' },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setFormData({ ...formData, satiety_duration: opt.val })}
                        className={`text-left p-4 rounded-2xl border text-sm font-sans transition-all flex items-center justify-between ${
                          formData.satiety_duration === opt.val
                            ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-500/20 font-bold text-slate-900'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {formData.satiety_duration === opt.val && (
                          <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="btn btn-ghost text-xs font-semibold"
                  >
                    &larr; Back
                  </button>
                ) : <div />}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={loading}
                  className="btn btn-primary text-xs px-6 py-3 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Analyzing Metabolic Profile...</span>
                    </>
                  ) : (
                    <>
                      <span>{step === 4 ? 'Calculate Metabolic Score' : 'Next Question'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 animate-fade-in shadow-sm">
              
              {/* Score Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
                    Your Personalized Metabolic Index
                  </div>
                  <div className="font-heading text-4xl sm:text-5xl text-slate-900 font-bold mt-1">
                    {result.metabolic_score} <span className="text-xl text-slate-400 font-normal">/ 100</span>
                  </div>
                </div>
                <div className="self-start sm:self-auto">
                  <span className="tag tag-accent text-xs font-mono font-bold">
                    {result.category}
                  </span>
                </div>
              </div>

              {/* 3 Key Calculated Insights */}
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1">
                  <div className="text-xs font-mono text-slate-500">Daily Fiber Deficit</div>
                  <div className="font-heading text-2xl text-orange-600 font-bold">
                    -{result.insights?.fiber_deficit_g || 14}g <span className="text-xs font-sans font-normal text-slate-400">/ day</span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-sans">Below 30g daily target</div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1">
                  <div className="text-xs font-mono text-slate-500">Glucose Volatility</div>
                  <div className="font-heading text-2xl text-slate-900 font-bold">
                    {result.insights?.glucose_volatility || 'Moderate'}
                  </div>
                  <div className="text-[11px] text-slate-600 font-sans">Post-meal slump risk</div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1">
                  <div className="text-xs font-mono text-slate-500">Current Satiety Window</div>
                  <div className="font-heading text-2xl text-emerald-700 font-bold">
                    ~{result.insights?.satiety_window_hours || 2.4} hrs
                  </div>
                  <div className="text-[11px] text-slate-600 font-sans">TriFiber target: 4.5+ hrs</div>
                </div>
              </div>

              {/* Personalized Protocol Box */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Evidence-Led Daily Protocol
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-sans">
                  {result.recommendation}
                </p>
                <div className="pt-2 text-xs font-sans text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Recommended Product:</strong> {result.recommended_product}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    if (setActiveTab) {
                      setActiveTab(result.recommended_skus?.includes('berberine-balance') ? 'berberine-balance' : 'trifiber-daily');
                    }
                  }}
                  className="btn btn-primary w-full sm:w-auto flex-1 text-sm py-3.5 flex items-center justify-center gap-2"
                >
                  <span>Explore Your Recommended Protocol</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={resetQuiz}
                  className="btn btn-ghost text-xs text-slate-600 py-3"
                >
                  Retake Quiz
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
