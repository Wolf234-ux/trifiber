import React, { useState } from 'react';
import { Lock, ShieldAlert, CheckCircle2, X } from 'lucide-react';

export default function OwnerAuthModal({ isOpen, onClose, onSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleVerify = (e) => {
    e.preventDefault();
    if (pin.trim() === '2026') {
      setError('');
      setPin('');
      onSuccess();
      onClose();
    } else {
      setError('Invalid Owner PIN. Access restricted to TriFiber Website Owner.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-6 text-left">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto border border-orange-200">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-xl font-bold text-slate-900">Website Owner Authentication</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto font-sans">
            The AI Marketing Suite & Lead Analytics are strictly restricted to the website founder and owner.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1">
              Enter Owner Security PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(''); }}
              placeholder="Enter PIN (Default: 2026)"
              className="input text-center text-lg tracking-widest font-mono font-bold bg-slate-50 border-slate-200"
              autoFocus
            />
            <p className="text-[10px] text-slate-400 mt-1 font-mono text-center">
              (Owner Master Access Key: <span className="font-bold text-orange-600">2026</span>)
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-800">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full py-3 text-sm font-semibold justify-center shadow-md"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Unlock Owner AI Suite</span>
          </button>
        </form>

        <div className="text-[11px] text-slate-400 text-center border-t border-slate-100 pt-3 font-mono">
          🔒 Secure Owner Gateway • TriFiber Health Administrative Portal
        </div>

      </div>
    </div>
  );
}
