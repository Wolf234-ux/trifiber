import React, { useState } from 'react';
import { Lock, ShieldAlert, CheckCircle2, X } from 'lucide-react';

export default function OwnerAuthModal({ isOpen, onClose, onSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleVerify = (e) => {
    e.preventDefault();
    // Default Owner Security PIN: 2026
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#201e1d]/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#f5ead8] border-2 border-[#c67139] rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#201e1d]/50 hover:text-[#201e1d] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#c67139]/10 text-[#c67139] rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#201e1d]">Website Owner Authentication</h3>
          <p className="text-xs text-[#201e1d]/70 max-w-xs mx-auto">
            The AI Marketing Suite & Lead Analytics are strictly restricted to the website founder and owner.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-[#201e1d]/70 mb-1 text-left">
              Enter Owner Security PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(''); }}
              placeholder="Enter PIN (Default: 2026)"
              className="input text-center text-lg tracking-widest font-mono font-bold"
              autoFocus
            />
            <p className="text-[10px] text-[#201e1d]/50 mt-1 font-mono text-center">
              (Owner Master Access Key: <span className="font-bold text-[#c67139]">2026</span>)
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-xs text-red-700">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
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

        <div className="text-[11px] text-[#201e1d]/60 text-center border-t border-[#201e1d]/10 pt-3">
          🔒 Secure Owner Gateway • TriFiber Health Administrative Portal
        </div>

      </div>
    </div>
  );
}
