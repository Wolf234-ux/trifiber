import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ClaimsChecker() {
  const [claimText, setClaimText] = useState('Supports healthy post-meal glucose metabolism and daily gut wellness.');
  const [jurisdiction, setJurisdiction] = useState('FSSAI');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/claims/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim_text: claimText, jurisdiction: jurisdiction })
      });
      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.error('Claims check error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-[#f5ead8]">
      <div className="container-max">
        <div className="max-w-3xl mx-auto bg-[#ebddc5] border border-[#201e1d]/10 rounded-[36px] p-8 md:p-12 text-left space-y-6">
          
          <div className="space-y-2">
            <span className="tag tag-accent">Regulatory Compliance Tool</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#201e1d]">
              FSSAI & FDA Health Claim Compliance Checker
            </h2>
            <p className="text-sm text-[#201e1d]/75">
              Verify marketing copy and structure/function claims against FSSAI Schedule IV/VII and FDA DSHEA compliance guidelines.
            </p>
          </div>

          <form onSubmit={handleCheck} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#201e1d] mb-1 uppercase tracking-wider">
                Target Regulatory Jurisdiction:
              </label>
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="input"
              >
                <option value="FSSAI">FSSAI (India Schedule IV / VII)</option>
                <option value="FDA">FDA (US Structure / Function DSHEA)</option>
                <option value="EFSA">EFSA (European Union Article 13.1)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#201e1d] mb-1 uppercase tracking-wider">
                Proposed Claim or Copy Text:
              </label>
              <textarea
                value={claimText}
                onChange={(e) => setClaimText(e.target.value)}
                rows={3}
                className="input"
                placeholder="Enter claim text..."
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full py-3">
              {loading ? 'Evaluating Copy...' : 'Audit Regulatory Compliance'}
            </button>
          </form>

          {report && (
            <div className="bg-[#f5ead8] border border-[#201e1d]/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#201e1d]">Jurisdiction: {report.jurisdiction}</span>
                <span className={`tag ${report.is_compliant ? 'tag-accent-2' : 'tag-accent'}`}>
                  {report.is_compliant ? 'Compliant Claim' : 'Non-Compliant Risk Detected'}
                </span>
              </div>

              {report.warnings?.length > 0 && (
                <div className="space-y-2 bg-[#fff2eb] p-4 rounded-xl border border-[#c67139]/30 text-xs text-[#8c491a]">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-[#c67139]" />
                    <span>Compliance Warning:</span>
                  </div>
                  {report.warnings.map((w, idx) => (
                    <div key={idx}>• {w}</div>
                  ))}
                </div>
              )}

              <div className="text-sm text-[#201e1d]/85">
                <strong>Suggested Compliant Copy:</strong>
                <p className="italic text-xs font-serif bg-[#ebddc5] p-3 rounded-lg mt-1 border border-[#201e1d]/10">
                  "{report.suggested_compliant_rewrite}"
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
