import React from 'react';
import { Activity, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800 text-xs">
      <div className="container-max space-y-12">
        
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-xl text-slate-100">
                TriFiber<span className="text-emerald-500 font-normal">Health</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs max-w-sm font-sans leading-relaxed">
              Everyday evidence-led metabolic nutrition for the post-GLP-1 era. Engineered multi-fiber blends and standardized botanicals built for long-term daily health habits.
            </p>

            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>ISO/IEC 17025 Tested • FSSAI Schedule VII & IV Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 font-mono">
            <h4 className="text-xs font-bold uppercase text-slate-200 tracking-wider">Platform Tools</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-emerald-400 transition-colors">
                  Product Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quiz')} className="hover:text-emerald-400 transition-colors">
                  Metabolic Assessment Quiz
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('batch')} className="hover:text-emerald-400 transition-colors">
                  Batch COA Transparency Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('claims')} className="hover:text-emerald-400 transition-colors">
                  FSSAI/FDA Claims Engine
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('marketing')} className="hover:text-emerald-400 transition-colors">
                  Growth & Marketing AI
                </button>
              </li>
            </ul>
          </div>

          {/* Regulatory Disclaimer Box */}
          <div className="md:col-span-4 space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 text-[11px] leading-relaxed font-sans">
            <h4 className="font-mono font-bold text-amber-400 uppercase text-[10px]">Regulatory Disclosures</h4>
            <p>
              * These statements have not been evaluated by the Food and Drug Administration (FDA) or European Medicines Agency (EMA). This product is a dietary supplement under FSSAI Schedule VII (Prebiotics/Dietary Fiber) and Schedule IV (Botanicals). It is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
            <p className="text-slate-500">
              TriFiber Health does not replace prescription GLP-1 receptor agonist medications. Consult your physician before starting any dietary supplement regimen.
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-600">
          <p>© 2026 TriFiber Health Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built for gut & metabolic health with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
}
