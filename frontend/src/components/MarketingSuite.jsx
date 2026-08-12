import React, { useState } from 'react';
import { Layers, Sparkles, RefreshCw, Copy, Check, Share2, Target, Flame } from 'lucide-react';

export default function MarketingSuite() {
  const [persona, setPersona] = useState('glucose_conscious');
  const [channel, setChannel] = useState('instagram');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/marketing/generate-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_persona: persona, channel: channel })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="marketing" className="py-20 bg-slate-950 text-white">
      <div className="container-max">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono font-semibold uppercase tracking-wider border border-purple-500/30">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Automated D2C Growth Suite</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100">
            AI Campaign & Angle Generator
          </h2>

          <p className="text-slate-400 text-base">
            Generate compliant high-converting ad angles, Instagram Reel scripts, and performance marketing hooks tailored to post-GLP-1 and glucose-conscious consumer segments.
          </p>
        </div>

        {/* Controls */}
        <div className="max-w-4xl mx-auto glass-dark p-8 rounded-3xl border border-slate-800 space-y-8 shadow-2xl">
          
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Persona Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                Target Consumer Persona
              </label>
              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                className="w-full p-3.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              >
                <option value="glucose_conscious">Glucose Conscious / Pre-diabetic Wellness</option>
                <option value="post_glp1_taper">Post-GLP-1 Off-Ramp / Satiety Maintenance</option>
                <option value="fitness_biohacker">Biohacker & Metabolic Performance</option>
                <option value="busy_professional">Busy Executive / Office Fiber Gap</option>
              </select>
            </div>

            {/* Channel Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-2">
                <Share2 className="w-4 h-4 text-amber-400" />
                Marketing Channel Format
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full p-3.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              >
                <option value="instagram">Instagram Reel Script & Visual Hook</option>
                <option value="linkedin">LinkedIn Founder & Scientific Deep-Dive</option>
                <option value="meta_ads">Meta Direct Response Ad Copy</option>
                <option value="email">Email Newsletter Onboarding Sequence</option>
              </select>
            </div>

          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 text-white flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-xl cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Generating Campaign Assets...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Campaign Angles</span>
              </>
            )}
          </button>

          {/* Results View */}
          {result && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-6 animate-fade-in">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="font-mono text-xs text-purple-400 uppercase font-bold">Campaign Result</span>
                  <h4 className="font-serif font-bold text-xl text-slate-100">{result.campaign_title || 'Post-Meal Satiety Protocol'}</h4>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Assets'}</span>
                </button>
              </div>

              {/* Angles / Hooks List */}
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold">High-Performing Hooks & Visual Angles:</span>
                
                <div className="grid gap-3 text-xs">
                  {result.hooks?.map((hook, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="font-mono font-bold text-amber-400">Angle 0{i + 1}:</span>
                      <p className="text-slate-200 font-sans text-sm font-medium">"{hook}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Direction & Targeting */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-purple-400 font-bold block uppercase">Visual Concept Direction</span>
                  <p className="text-slate-300 font-sans">{result.visual_concept || 'Split screen: Continuous Glucose Monitor (CGM) spike comparison with vs without 1 scoop Lemon-Jeera TriFiber.'}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block uppercase">Compliance Guardrails</span>
                  <p className="text-slate-300 font-sans">{result.compliance_note || 'Structure/function claim approved. No disease cure or prescription weight loss claims.'}</p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
