import React, { useState } from 'react';
import { Sparkles, Send, Copy, Check } from 'lucide-react';

export default function MarketingSuite() {
  const [persona, setPersona] = useState('glucose_conscious');
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/marketing/generate-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_persona: persona })
      });
      const data = await res.json();
      setCampaign(data);
    } catch (err) {
      console.error('Campaign generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-max">
        <div className="max-w-3xl mx-auto bg-slate-950 text-white rounded-[36px] p-8 md:p-12 text-left space-y-8 shadow-xl">
          
          <div className="space-y-3">
            <span className="tag bg-orange-500/20 text-orange-400 border border-orange-500/30">AI Growth Suite</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Automated Campaign Asset Generator
            </h2>
            <p className="text-sm text-slate-400 font-sans">
              Instantly generate FSSAI/FDA compliant ad copy, email hooks, and angle directions tailored to specific target personas.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Select Target Audience Persona:
              </label>
              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                className="input !bg-slate-900 !text-white !border-slate-700"
              >
                <option value="glucose_conscious">Glucose-Conscious Professionals (3 PM Energy Slump)</option>
                <option value="fiber_gap">Digestive Wellness Seekers (Tired of Psyllium Sludge)</option>
                <option value="post_glp1">Post-GLP-1 Weight Maintenance Routine</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full py-3.5 text-base font-bold shadow-md">
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Generating Copy Assets...' : 'Generate Marketing Campaign'}</span>
            </button>
          </form>

          {campaign && (
            <div className="bg-slate-900 border border-orange-500/30 rounded-2xl p-6 space-y-4 text-sm animate-fade-in">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-orange-400">Generated Campaign Title:</span>
                <h3 className="font-heading text-xl font-bold text-white mt-1">{campaign.campaign_title}</h3>
              </div>

              <div className="space-y-3 text-xs text-slate-200 font-sans">
                <div>
                  <strong className="text-orange-400 block mb-1">Social Hook:</strong>
                  <p className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    "{campaign.copy_assets?.hook}"
                  </p>
                </div>

                <div>
                  <strong className="text-orange-400 block mb-1">Email Subject Line:</strong>
                  <p className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    "{campaign.copy_assets?.email_subject}"
                  </p>
                </div>

                <div>
                  <strong className="text-emerald-400 block mb-1">Creative Angle & Compliance:</strong>
                  <p className="italic text-slate-400">
                    {campaign.copy_assets?.key_angle} — {campaign.compliance_note}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
