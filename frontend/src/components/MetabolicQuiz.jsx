import React, { useState } from 'react';
import { Sparkles, Activity, CheckCircle2, RefreshCw } from 'lucide-react';

export default function MetabolicQuiz({ setActiveTab }) {
  const [formData, setFormData] = useState({
    glucose_spikes: 3,
    cravings_score: 3,
    fiber_intake: 2,
    satiety_duration: 2
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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
      console.error('Quiz evaluation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-[#f5ead8]">
      <div className="container-max">
        <div className="max-w-3xl mx-auto bg-[#ebddc5] border border-[#201e1d]/10 rounded-[36px] p-8 md:p-12 text-left space-y-8 shadow-sm">
          
          <div className="space-y-3">
            <span className="tag tag-accent">Interactive Tool</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#201e1d]">
              Metabolic Satiety & Fiber Deficit Quiz
            </h2>
            <p className="text-sm text-[#201e1d]/75">
              Calculate your personal metabolic score and fiber deficit in under 60 seconds.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-xs font-semibold text-[#201e1d] mb-2 uppercase tracking-wider">
                1. How often do you experience 3 PM post-meal energy slumps? (1 = Never, 5 = Everyday)
              </label>
              <select
                value={formData.glucose_spikes}
                onChange={(e) => setFormData({ ...formData, glucose_spikes: Number(e.target.value) })}
                className="input"
              >
                <option value={1}>1 - Rare / High energy</option>
                <option value={2}>2 - Occasional mild slump</option>
                <option value={3}>3 - Moderate slumps 2-3 times/week</option>
                <option value={4}>4 - Frequent daily crashes</option>
                <option value={5}>5 - Severe fatigue after every meal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#201e1d] mb-2 uppercase tracking-wider">
                2. Intensity of mid-afternoon sugar or refined carb cravings:
              </label>
              <select
                value={formData.cravings_score}
                onChange={(e) => setFormData({ ...formData, cravings_score: Number(e.target.value) })}
                className="input"
              >
                <option value={1}>1 - None / Full control</option>
                <option value={2}>2 - Mild appetite</option>
                <option value={3}>3 - Moderate carb cravings</option>
                <option value={4}>4 - Strong urge for sweets/snacks</option>
                <option value={5}>5 - Intense uncontrollable cravings</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#201e1d] mb-2 uppercase tracking-wider">
                3. Estimated daily servings of high-fiber whole foods (beans, oats, seeds, greens):
              </label>
              <select
                value={formData.fiber_intake}
                onChange={(e) => setFormData({ ...formData, fiber_intake: Number(e.target.value) })}
                className="input"
              >
                <option value={1}>1 - Less than 1 serving (&lt; 10g total fiber)</option>
                <option value={2}>2 - About 1-2 servings (~12g fiber)</option>
                <option value={3}>3 - 2-3 servings (~18g fiber)</option>
                <option value={4}>4 - 4 servings (~24g fiber)</option>
                <option value={5}>5 - 5+ servings (&gt; 30g daily fiber target)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#201e1d] mb-2 uppercase tracking-wider">
                4. Average fullness/satiety duration after lunch:
              </label>
              <select
                value={formData.satiety_duration}
                onChange={(e) => setFormData({ ...formData, satiety_duration: Number(e.target.value) })}
                className="input"
              >
                <option value={1}>1 - Hungry again within 1 hour</option>
                <option value={2}>2 - Full for ~2 hours</option>
                <option value={3}>3 - Full for 3 hours</option>
                <option value={4}>4 - Sustained energy for 4 hours</option>
                <option value={5}>5 - Steady energy for 5+ hours</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3.5 text-base"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Calculating...
                </span>
              ) : (
                'Calculate My Metabolic Score'
              )}
            </button>

          </form>

          {/* Results Output */}
          {result && (
            <div className="bg-[#f5ead8] border border-[#c67139]/30 rounded-2xl p-6 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-[#201e1d]/10 pb-4">
                <div>
                  <div className="text-xs font-mono uppercase text-[#7a8a5e]">Your Metabolic Score</div>
                  <div className="font-serif text-4xl text-[#201e1d] font-bold">{result.metabolic_score} / 100</div>
                </div>
                <div className="text-right">
                  <span className="tag tag-accent">{result.category}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-[#201e1d]/85">
                <p><strong>Recommendation:</strong> {result.recommendation}</p>
                <p><strong>Estimated Daily Fiber Deficit:</strong> ~{result.insights?.fiber_deficit_g || 12} grams</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab(result.recommended_skus?.includes('berberine-balance') ? 'berberine-balance' : 'trifiber-daily')}
                  className="btn btn-secondary w-full py-2.5"
                >
                  View Recommended Protocol ({result.recommended_product}) &rarr;
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
