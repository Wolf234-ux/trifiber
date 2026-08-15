import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenOwnerModal, isOwnerAuthenticated }) {
  const [email, setEmail] = useState('');
  const [leadSuccess, setLeadSuccess] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/marketing/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, interest: 'both' })
      });
      setLeadSuccess(true);
      setEmail('');
    } catch (err) {
      console.error('Lead capture error:', err);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-200 py-16 border-t border-slate-800 text-left">
      <div className="container-max space-y-12">
        
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <button 
              onDoubleClick={onOpenOwnerModal}
              className="font-heading text-3xl font-extrabold tracking-tight text-white text-left focus:outline-none"
              title="TriFiber Health"
            >
              TriFiber<span className="text-orange-500">.</span>
            </button>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm font-sans">
              Evidence-led everyday nutrition for gut and metabolic health in the post-GLP-1 era. Simple, daily habits engineered for long-term health.
            </p>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              FSSAI Schedule IV & VII Compliant
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading text-lg font-bold text-white mb-2">Platform Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400 font-sans">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-orange-400 transition-colors">Home</button></li>
              <li><button onClick={() => setActiveTab('trifiber-daily')} className="hover:text-orange-400 transition-colors">TriFiber Daily</button></li>
              <li><button onClick={() => setActiveTab('berberine-balance')} className="hover:text-orange-400 transition-colors">Berberine Balance</button></li>
              <li><button onClick={() => setActiveTab('why-fiber')} className="hover:text-orange-400 transition-colors">Why Fiber & Science</button></li>
              <li><button onClick={() => setActiveTab('batch')} className="hover:text-orange-400 transition-colors">Batch Quality QA</button></li>
              <li><button onClick={() => setActiveTab('quiz')} className="hover:text-orange-400 transition-colors">Metabolic Quiz</button></li>
            </ul>
          </div>

          {/* Newsletter / VIP Lead Capture */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-heading text-lg font-bold text-white">Metabolic Insights Newsletter</h4>
            <p className="text-xs text-slate-400 font-sans">
              Get 15% off your first order plus monthly clinical research updates on gut microbiome & glucose health.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input !bg-slate-900 !text-white !border-slate-700 flex-1 text-xs"
                />
                <button type="submit" className="btn btn-primary py-2 px-4 text-xs">
                  <span>Join VIP</span>
                </button>
              </div>
              {leadSuccess && (
                <div className="text-xs text-emerald-400 font-semibold font-sans">
                  Welcome to the TriFiber Health VIP Community!
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-sans">
          <div>
            TriFiber Health © 2026. Built in India, Designed for the World.
          </div>
          <div>
            FSSAI License Compliant | Analytical QA verified by Eurofins & SGS
          </div>
        </div>

      </div>
    </footer>
  );
}
