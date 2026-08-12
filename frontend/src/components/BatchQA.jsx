import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, FileText, CheckCircle, RefreshCw, AlertCircle, Award } from 'lucide-react';

export default function BatchQA() {
  const [batchIdInput, setBatchIdInput] = useState('TFH-2026-B001');
  const [batchData, setBatchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBatch = async (idToFetch) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/batch/${idToFetch.trim()}`);
      if (!res.ok) {
        throw new Error('Batch record not found in COA registry');
      }
      const data = await res.json();
      setBatchData(data);
    } catch (err) {
      setError(err.message);
      setBatchData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatch('TFH-2026-B001');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (batchIdInput) {
      fetchBatch(batchIdInput);
    }
  };

  return (
    <section id="batch" className="py-20 bg-[#FAF8F5]">
      <div className="container-max">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Uncompromising Quality Standard</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Batch Quality & COA Transparency Portal
          </h2>

          <p className="text-slate-600 text-base">
            Every production batch undergoes 3rd-party independent analytical testing by ISO/IEC 17025 accredited laboratories (Eurofins & SGS). Enter your batch number printed on the bottom of your box or jar below.
          </p>
        </div>

        {/* Search Bar & Sample Presets */}
        <div className="max-w-2xl mx-auto space-y-4 mb-12">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={batchIdInput}
                onChange={(e) => setBatchIdInput(e.target.value)}
                placeholder="e.g. TFH-2026-B001"
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-300 rounded-xl font-mono text-sm uppercase text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Verify Batch</span>}
            </button>
          </form>

          {/* Quick Pre-fill buttons */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 justify-center">
            <span>Try sample batches:</span>
            <button
              type="button"
              onClick={() => { setBatchIdInput('TFH-2026-B001'); fetchBatch('TFH-2026-B001'); }}
              className="px-2.5 py-1 rounded bg-slate-200 text-slate-800 hover:bg-emerald-100 hover:text-emerald-900 transition-colors font-semibold"
            >
              TFH-2026-B001 (TriFiber)
            </button>
            <button
              type="button"
              onClick={() => { setBatchIdInput('TFH-2026-B002'); fetchBatch('TFH-2026-B002'); }}
              className="px-2.5 py-1 rounded bg-slate-200 text-slate-800 hover:bg-emerald-100 hover:text-emerald-900 transition-colors font-semibold"
            >
              TFH-2026-B002 (Berberine)
            </button>
          </div>
        </div>

        {/* Results Container */}
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <p className="font-bold text-sm">Batch Lookup Error</p>
                <p className="text-xs text-rose-700">{error}. Please check the batch code on your sachet or jar.</p>
              </div>
            </div>
          )}

          {batchData && (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-lg space-y-8 animate-fade-in">
              
              {/* Batch Metadata Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-emerald-700">{batchData.batch_id}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[11px] font-bold">
                      {batchData.status}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-slate-900 mt-1">{batchData.product_name}</h3>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200">
                  <Award className="w-8 h-8 text-amber-500 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Testing Laboratory</span>
                    <span className="text-xs font-bold text-slate-900">{batchData.lab_name}</span>
                  </div>
                </div>
              </div>

              {/* Manufacturing Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 font-mono block text-[10px] uppercase">Mfg Date</span>
                  <span className="font-bold text-slate-900 font-mono">{batchData.manufacture_date}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono block text-[10px] uppercase">Exp Date</span>
                  <span className="font-bold text-slate-900 font-mono">{batchData.expiry_date}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono block text-[10px] uppercase">Audit Protocol</span>
                  <span className="font-bold text-slate-900">ISO/IEC 17025</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono block text-[10px] uppercase">Release Approval</span>
                  <span className="font-bold text-emerald-700">PASS / CLEAN</span>
                </div>
              </div>

              {/* Analytical Test Table */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg font-bold text-slate-900">Analytical Assay & Heavy Metal Screen</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-mono">
                        <th className="py-3 px-4 uppercase font-semibold">Test Parameter</th>
                        <th className="py-3 px-4 uppercase font-semibold">Verified Assay Result</th>
                        <th className="py-3 px-4 uppercase font-semibold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {batchData.tests?.map((test, index) => (
                        <tr key={index} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-semibold text-slate-900">{test.parameter}</td>
                          <td className="py-3 px-4 font-mono text-slate-700">{test.result}</td>
                          <td className="py-3 px-4 text-right">
                            <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              {test.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* COA Download Footer */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-200">
                <span className="text-xs text-slate-500 font-mono">Digital Signature Certified by QA Lead</span>
                <a
                  href={batchData.coa_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 font-mono underline"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Signed Lab COA (PDF)</span>
                </a>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
}
