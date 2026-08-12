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
    <footer className="bg-[#201e1d] text-[#f5ead8] py-16 border-t border-[#f5ead8]/10 text-left">
      <div className="container-max space-y-12">
        
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <button 
              onDoubleClick={onOpenOwnerModal}
              className="font-serif text-3xl font-bold tracking-tight text-[#f5ead8] text-left focus:outline-none"
              title="TriFiber Health"
            >
              TriFiber<span className="text-[#c67139]">.</span>
            </button>
            <p className="text-sm text-[#f5ead8]/70 leading-relaxed max-w-sm">
              Evidence-led everyday nutrition for gut and metabolic health in the post-GLP-1 era. Simple, daily habits engineered for long-term health.
            </p>
            <div className="text-xs font-mono text-[#7a8a5e] uppercase tracking-wider font-semibold">
              FSSAI Schedule IV & VII Compliant
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-lg text-[#f5ead8] mb-2">Platform Navigation</h4>
            <ul className="space-y-2 text-sm text-[#f5ead8]/70">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-[#c67139] transition-colors">Home</button></li>
              <li><button onClick={() => setActiveTab('trifiber-daily')} className="hover:text-[#c67139] transition-colors">TriFiber Daily</button></li>
              <li><button onClick={() => setActiveTab('berberine-balance')} className="hover:text-[#c67139] transition-colors">Berberine Balance</button></li>
              <li><button onClick={() => setActiveTab('why-fiber')} className="hover:text-[#c67139] transition-colors">Why Fiber & Science</button></li>
              <li><button onClick={() => setActiveTab('batch')} className="hover:text-[#c67139] transition-colors">Quality Batch QA</button></li>
              <li><button onClick={() => setActiveTab('quiz')} className="hover:text-[#c67139] transition-colors">Metabolic Quiz</button></li>
            </ul>
          </div>

          {/* Newsletter / VIP Lead Capture */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-lg text-[#f5ead8]">Metabolic Insights Newsletter</h4>
            <p className="text-xs text-[#f5ead8]/70">
              Get 15% off your first order plus monthly clinical research updates on gut microbiome & glucose health.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input !bg-[#2e2b25] !text-[#f5ead8] !border-[#f5ead8]/20 flex-1 text-xs"
                />
                <button type="submit" className="btn btn-primary py-2 px-4 text-xs">
                  <span>Join VIP</span>
                </button>
              </div>
              {leadSuccess && (
                <div className="text-xs text-[#7a8a5e] font-semibold">
                  Welcome to the TriFiber Health VIP Community!
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#f5ead8]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#f5ead8]/50 gap-4">
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
