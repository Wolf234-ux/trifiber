import React, { useState } from 'react';
import { FileCheck, ShieldAlert, CheckCircle2, RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';

export default function ClaimsChecker() {
  const [claimText, setClaimText] = useState('Helps modulate post-meal glucose spikes and supports SCFA gut health');
  const [jurisdiction, setJurisdiction] = useState('FSSAI');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const presets = [
    'Helps modulate post-meal glucose spikes and supports SCFA gut health',
    'Natural alternative to prescription Ozempic for fast weight loss',
    'Supports healthy daily bowel regularity without bloating',
    'Replaces GLP-1 injections for diabetes cure'
  ];

  const handleCheck = async (textToCheck = claimText, regToCheck = jurisdiction) => {
    setLoading(true);
    try {
      const res = await fetch('/api/claims/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim_text: textToCheck, jurisdiction: regToCheck })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="claims" className="py-20 bg-slate-900 text-white">
      <div className="container-max">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-semibold uppercase tracking-wider border border-blue-500/30">
            <FileCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>"Prove More, Claim Less" Regulatory Governance</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100">
            FSSAI / FDA Regulatory Claims Compliance Engine
          </h2>

          <p className="text-slate-400 text-base">
            TriFiber Health adheres strictly to regulatory framework boundaries across international jurisdictions. Use our real-time rules engine to evaluate marketing claims for legal compliance.
          </p>
        </div>

        {/* Input & Options Box */}
        <div className="max-w-3xl mx-auto glass-dark p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
          
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase">Target Regulatory Jurisdiction</label>
            <div className="grid grid-cols-3 gap-3">
              {['FSSAI', 'FDA', 'EFSA'].map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => { setJurisdiction(reg); handleCheck(claimText, reg); }}
                  className={`py-3 px-4 rounded-xl text-xs font-mono font-bold border transition-all ${
                    jurisdiction === reg
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {reg === 'FSSAI' && '🇮🇳 FSSAI (India)'}
                  {reg === 'FDA' && '🇺🇸 FDA (United States)'}
                  {reg === 'EFSA' && '🇪🇺 EFSA (European Union)'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase">Proposed Product / Marketing Claim</label>
            <textarea
              rows={3}
              value={claimText}
              onChange={(e) => setClaimText(e.target.value)}
              placeholder="Enter health or ingredient claim..."
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-sm font-sans text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-slate-400">Click to test preset marketing claims:</span>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => { setClaimText(preset); handleCheck(preset, jurisdiction); }}
                  className="text-left text-[11px] px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 font-sans transition-colors"
                >
                  "{preset.slice(0, 45)}..."
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleCheck(claimText, jurisdiction)}
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Evaluate Legal Compliance</span>}
          </button>

          {/* Compliance Results View */}
          {result && (
            <div className={`p-6 rounded-2xl border space-y-4 animate-fade-in ${
              result.is_compliant 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
            }`}>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold font-serif text-lg">
                  {result.is_compliant ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>COMPLIANT under {result.jurisdiction} Guidance</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      <span>NON-COMPLIANT / REGULATORY WARNING</span>
                    </>
                  )}
                </div>
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-700">
                  {result.jurisdiction} Ruleset
                </span>
              </div>

              {result.warnings?.length > 0 && (
                <div className="space-y-1 text-xs">
                  <span className="font-mono font-bold text-amber-400 uppercase">Warnings Flagged:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {result.warnings.map((warn, i) => (
                      <li key={i}>{warn}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.suggested_compliant_rewrite && (
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                  <span className="font-mono text-emerald-400 font-bold uppercase">Suggested Compliant Structure/Function Claim:</span>
                  <p className="font-serif italic text-slate-200">"{result.suggested_compliant_rewrite}"</p>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
