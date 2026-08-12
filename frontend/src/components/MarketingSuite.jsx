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
    <section className="py-16 bg-[#f5ead8]">
      <div className="container-max">
        <div className="max-w-3xl mx-auto bg-[#201e1d] text-[#f5ead8] rounded-[36px] p-8 md:p-12 text-left space-y-8 shadow-md">
          
          <div className="space-y-3">
            <span className="tag tag-accent">AI Growth Suite</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f5ead8]">
              Automated Campaign Asset Generator
            </h2>
            <p className="text-sm text-[#f5ead8]/75">
              Instantly generate FSSAI/FDA compliant ad copy, email hooks, and angle directions tailored to specific target personas.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#f5ead8]/80 mb-2 uppercase tracking-wider">
                Select Target Audience Persona:
              </label>
              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                className="input !bg-[#2e2b25] !text-[#f5ead8] !border-[#f5ead8]/20"
              >
                <option value="glucose_conscious">Glucose-Conscious Professionals (3 PM Energy Slump)</option>
                <option value="fiber_gap">Digestive Wellness Seekers (Tired of Psyllium Sludge)</option>
                <option value="post_glp1">Post-GLP-1 Weight Maintenance Routine</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full py-3.5 text-base">
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Generating Copy Assets...' : 'Generate Marketing Campaign'}</span>
            </button>
          </form>

          {campaign && (
            <div className="bg-[#2e2b25] border border-[#c67139]/30 rounded-2xl p-6 space-y-4 text-sm animate-fade-in">
              <div className="border-b border-[#f5ead8]/15 pb-3">
                <span className="text-xs font-mono text-[#c67139]">Generated Campaign Title:</span>
                <h3 className="font-serif text-xl text-[#f5ead8] mt-1">{campaign.campaign_title}</h3>
              </div>

              <div className="space-y-3 text-xs text-[#f5ead8]/90">
                <div>
                  <strong className="text-[#c67139] block mb-1">Social Hook:</strong>
                  <p className="bg-[#201e1d] p-3 rounded-lg border border-[#f5ead8]/10 font-sans">
                    "{campaign.copy_assets?.hook}"
                  </p>
                </div>

                <div>
                  <strong className="text-[#c67139] block mb-1">Email Subject Line:</strong>
                  <p className="bg-[#201e1d] p-3 rounded-lg border border-[#f5ead8]/10 font-sans">
                    "{campaign.copy_assets?.email_subject}"
                  </p>
                </div>

                <div>
                  <strong className="text-[#7a8a5e] block mb-1">Creative Angle & Compliance:</strong>
                  <p className="italic text-[#f5ead8]/70">
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
