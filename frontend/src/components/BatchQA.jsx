import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, FileText, ExternalLink } from 'lucide-react';

export default function BatchQA() {
  const [batchId, setBatchId] = useState('TFH-2026-B001');
  const [loading, setLoading] = useState(false);
  const [batchData, setBatchData] = useState(null);

  const fetchBatch = async (idToFetch) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/batch/${idToFetch.trim()}`);
      const data = await res.json();
      setBatchData(data);
    } catch (err) {
      console.error('Batch fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (batchId) fetchBatch(batchId);
  };

  return (
    <section className="py-16 bg-[#f5ead8]">
      <div className="container-max">
        <div className="max-w-4xl mx-auto space-y-8 text-left">
          
          <div className="space-y-3 text-center sm:text-left">
            <span className="tag tag-accent-2">100% Quality Transparency</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#201e1d]">
              Batch Quality Assurance & Certificate of Analysis
            </h2>
            <p className="text-sm text-[#201e1d]/75 max-w-2xl">
              Every jar and sachet pouch printed with a unique QR code linked directly to Eurofins & SGS third-party lab test verification reports.
            </p>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="bg-[#ebddc5] border border-[#201e1d]/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                placeholder="Enter Batch ID (e.g. TFH-2026-B001)"
                className="input pl-10"
              />
              <Search className="w-4 h-4 text-[#201e1d]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full sm:w-auto px-6 py-2.5">
              {loading ? 'Searching...' : 'Verify Batch QA'}
            </button>
          </form>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#201e1d]/60 font-mono">
            <span>Try sample batches:</span>
            <button
              onClick={() => { setBatchId('TFH-2026-B001'); fetchBatch('TFH-2026-B001'); }}
              className="px-3 py-1 rounded-full bg-[#ebddc5] border border-[#201e1d]/15 text-[#201e1d] hover:border-[#c67139]"
            >
              TFH-2026-B001 (TriFiber)
            </button>
            <button
              onClick={() => { setBatchId('TFH-2026-B002'); fetchBatch('TFH-2026-B002'); }}
              className="px-3 py-1 rounded-full bg-[#ebddc5] border border-[#201e1d]/15 text-[#201e1d] hover:border-[#7a8a5e]"
            >
              TFH-2026-B002 (Berberine)
            </button>
          </div>

          {/* Batch Certificate Display */}
          {batchData && (
            <div className="bg-[#ebddc5] border border-[#201e1d]/10 rounded-3xl p-8 space-y-6">
              
              <div className="flex flex-wrap justify-between items-start gap-4 border-b border-[#201e1d]/10 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="tag tag-accent">{batchData.status || 'VERIFIED'}</span>
                    <span className="text-xs font-mono text-[#7a8a5e] font-semibold">{batchData.lab_name}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#201e1d]">{batchData.product_name}</h3>
                  <div className="text-xs font-mono text-[#201e1d]/60 mt-1">Batch ID: {batchData.batch_id}</div>
                </div>

                <a
                  href={batchData.coa_url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary text-xs"
                >
                  <FileText className="w-3.5 h-3.5 text-[#c67139]" />
                  <span>Download Lab CoA (PDF)</span>
                </a>
              </div>

              {/* Lab Test Parameters Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#201e1d]/15 text-xs font-mono uppercase text-[#201e1d]/60">
                      <th className="py-2.5 px-3">Testing Parameter</th>
                      <th className="py-2.5 px-3">Analytical Result</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(batchData.tests || []).map((t, idx) => (
                      <tr key={idx} className="border-b border-[#201e1d]/10 hover:bg-[#f5ead8]/50 transition-colors">
                        <td className="py-3 px-3 font-medium text-[#201e1d]">{t.parameter}</td>
                        <td className="py-3 px-3 font-mono text-xs text-[#201e1d]/80">{t.result}</td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#7a8a5e]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{t.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
