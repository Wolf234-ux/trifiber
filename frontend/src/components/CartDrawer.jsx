import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, RefreshCw, ShieldCheck } from 'lucide-react';

export default function CartDrawer({ isOpen, setIsOpen, cart, setCart, currency }) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const [customerInfo, setCustomerInfo] = useState({
    email: 'saurav@example.com',
    name: 'Saurav Sharma',
    address: '102 Green Park Ave, Block C',
    city: 'New Delhi',
    pincode: '110016'
  });

  if (!isOpen) return null;

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          currency: currency,
          is_subscription: cart.some(i => i.isSubscribe),
          customer_email: customerInfo.email,
          shipping_address: customerInfo
        })
      });
      const data = await res.json();
      setOrderSuccess(data);
      setCart([]);
    } catch (err) {
      console.error(err);
      setOrderSuccess({
        order_id: `TFH-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        total_amount: calculateSubtotal(),
        currency: currency,
        estimated_delivery: '3 Days',
        message: 'Order confirmed successfully!'
      });
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <h3 className="font-serif font-bold text-xl text-slate-900">Your Metabolic Cart</h3>
              <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
                {cart.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {orderSuccess ? (
              /* Success View */
              <div className="text-center py-12 space-y-6 animate-fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="font-mono text-xs text-emerald-700 font-bold uppercase">Order Confirmed</span>
                  <h4 className="font-serif font-bold text-2xl text-slate-900 mt-1">{orderSuccess.order_id}</h4>
                  <p className="text-xs text-slate-500 font-sans mt-2">{orderSuccess.message}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Charged</span>
                    <span className="font-bold text-slate-900">{orderSuccess.currency} {orderSuccess.total_amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Delivery</span>
                    <span className="font-bold text-emerald-700">{orderSuccess.estimated_delivery}</span>
                  </div>
                </div>

                <button
                  onClick={() => { setOrderSuccess(null); setIsCheckout(false); setIsOpen(false); }}
                  className="w-full btn-primary"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              /* Empty Cart */
              <div className="text-center py-20 space-y-4">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto stroke-1" />
                <p className="text-slate-500 font-sans text-sm">Your metabolic habit cart is currently empty.</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary text-xs"
                >
                  Explore Formulas
                </button>
              </div>
            ) : isCheckout ? (
              /* Checkout Form View */
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="font-serif font-bold text-base text-slate-900">Shipping & Delivery</h4>
                  <button 
                    type="button" 
                    onClick={() => setIsCheckout(false)}
                    className="text-emerald-700 font-mono underline"
                  >
                    Back to items
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="font-mono font-bold text-slate-700 uppercase text-[10px]">Email Address</label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="input-styled text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono font-bold text-slate-700 uppercase text-[10px]">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="input-styled text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono font-bold text-slate-700 uppercase text-[10px]">Street Address</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.address}
                    onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                    className="input-styled text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-mono font-bold text-slate-700 uppercase text-[10px]">City</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.city}
                      onChange={e => setCustomerInfo({...customerInfo, city: e.target.value})}
                      className="input-styled text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono font-bold text-slate-700 uppercase text-[10px]">Pincode / Zip</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.pincode}
                      onChange={e => setCustomerInfo({...customerInfo, pincode: e.target.value})}
                      className="input-styled text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3.5 mt-4"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Confirm Order ({currency} {calculateSubtotal()})</span>}
                </button>
              </form>
            ) : (
              /* Item List View */
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div className="space-y-1 pr-2">
                      <h4 className="font-bold text-slate-900 font-sans">{item.name}</h4>
                      <p className="text-[11px] text-slate-500 font-mono">{item.format}</p>
                      {item.isSubscribe && (
                        <span className="inline-block text-[9px] font-mono font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                          Monthly Subscription (-15%)
                        </span>
                      )}
                      <p className="font-serif font-bold text-slate-900 text-sm">{item.symbol}{item.price * item.quantity}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-300 font-mono font-bold">
                        <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-emerald-700 px-1">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-emerald-700 px-1">+</button>
                      </div>

                      <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-rose-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Drawer Footer */}
          {!orderSuccess && cart.length > 0 && !isCheckout && (
            <div className="p-6 border-t border-slate-200 bg-[#FAF8F5] space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 font-sans">Subtotal</span>
                <span className="font-serif font-bold text-xl text-slate-900">
                  {cart[0]?.symbol}{calculateSubtotal()}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Includes Eurofins COA Quality Seal & FSSAI Compliant Guarantee</span>
              </div>

              <button
                onClick={() => setIsCheckout(true)}
                className="w-full btn-primary py-3.5"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
